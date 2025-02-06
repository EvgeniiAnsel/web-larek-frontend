import { ApiModel } from '../Model/ApiModel';
import { FormModel } from '../Model/FormModel';
import { ProductList } from '../Model/ProductModel';
import { BasketModel } from '../Model/BasketModel';

import { Card } from '../View/CardView';
import { Modal } from '../View/ModalView';
import { Success } from '../View/SuccessView';
import { OrderForm } from '../View/FormOrderView';
import { BasketView } from '../View/BasketView';
import { BasketItem } from '../View/BasketItemView';
import { ProductCard } from '../View/CardPreviewView';
import { FormContacts } from '../View/FormContactView';

import { IEvents } from '../base/events';
import { Page } from '../../utils/utils';
import { IProductItem, IOrderLot, FormErrors } from '../../types/Types';

export class Presenter { 
  private formModel: FormModel; 
  private basketModel: BasketModel;
  private apiModel: ApiModel;
  private orderForm: OrderForm;
  private basketView: BasketView;
  private successMessage: Success;
  private contactsForm: FormContacts;
  private modal: Modal;
  private page: Page;
  private templates: {
    order: HTMLTemplateElement;
    basket: HTMLTemplateElement;
    success: HTMLTemplateElement;
    contacts: HTMLTemplateElement;
    cardBasket: HTMLTemplateElement;
    cardCatalog: HTMLTemplateElement;
    cardPreview: HTMLTemplateElement;
  };
  private dataModel: ProductList;

  constructor(
    private events: IEvents,
    formModel: FormModel,
    basketModel: BasketModel,
    apiModel: ApiModel,
    orderForm: OrderForm,
    basketView: BasketView,
    successMessage: Success,
    contactsForm: FormContacts,
    modal: Modal,
    page: Page,
    templates: {
      order: HTMLTemplateElement;
      basket: HTMLTemplateElement;
      success: HTMLTemplateElement;
      contacts: HTMLTemplateElement;
      cardBasket: HTMLTemplateElement;
      cardCatalog: HTMLTemplateElement;
      cardPreview: HTMLTemplateElement;
    },
    dataModel: ProductList
  ) {
    this.formModel = formModel;
    this.basketModel = basketModel;
    this.apiModel = apiModel;
    this.orderForm = orderForm;
    this.basketView = basketView;
    this.successMessage = successMessage;
    this.contactsForm = contactsForm;
    this.modal = modal;
    this.page = page;
    this.templates = templates;
    this.dataModel = dataModel;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.events.on('order:paymentMethodSelected', (data: { payment: string }) => {
      this.formModel.setPayment(data.payment);
      this.formModel.validateOrder();
    });

    this.events.on('order:addressFieldChanged', (data: { field: string; value: string }) => {
      this.formModel.setOrderAddress(data.field, data.value);
    });

    this.events.on('contacts:inputChanged', (data: { field: string; value: string }) => {
      this.formModel.setOrderData(data.field, data.value);
    });

    this.events.on('order:submit', () => {
      if (this.formModel.validateOrder()) {
        this.events.emit('contacts:open');
      } else {
        this.events.emit('formErrors:change', this.formModel.getErrors());
      }
    });

    this.events.on('contacts:submit', () => {
      if (this.formModel.validateContacts()) {
        this.events.emit('success:open');
      } else {
        this.events.emit('formErrors:change', this.formModel.getErrors());
      }
    });

    this.events.on('contacts:validate', () => {
      const isValid = this.formModel.validateContacts();
      this.events.emit('contacts:validityChanged', { isValid });
    });

    this.events.on('modal:open', () => {
      this.modal.open();
    });

    this.events.on('modal:close', () => {
      this.modal.close();
    });

    this.events.on('order:open', () => {
      this.modal.render(this.orderForm.render());
      this.events.emit('modal:open');
    });

    this.events.on('contacts:open', () => {
      console.log('contacts:open');
      const contactsElement = this.contactsForm.render();
      this.modal.render(contactsElement);
      this.events.emit('modal:open');
    });

    this.events.on('formErrors:change', (errors: FormErrors) => {
      this.orderForm.errorMessages = Object.values(errors).filter(Boolean) as string[];
      this.contactsForm.errorMessages = Object.values(errors).filter(Boolean) as string[];
    });

    this.events.on('success:open', () => {
      const orderData: IOrderLot = {
        ...this.formModel.getOrderLot(),
        total: this.basketModel.getSumAllProducts(),
        items: this.basketModel.getProductIds(),
      };
      console.log('Формируемый заказ:', orderData);
      this.apiModel.postOrderLot(orderData)
        .then(() => {
          this.modal.render(this.successMessage.render(orderData.total));
          this.basketModel.clearBasketProducts();
          this.events.emit('basket:change'); // Обновляем корзину после успешного заказа
          this.events.emit('modal:open');
        })
        .catch((error) => {
          console.log(error);
          this.contactsForm.errorMessages = ['Не удалось оформить заказ. Проверьте данные и попробуйте снова.'];
          this.contactsForm.isValid = false;
          this.events.emit('modal:open');
        });
    });

    this.events.on('basket:open', () => {
      this.modal.render(this.basketView.render());
      this.events.emit('modal:open');
    });

    this.events.on('basket:change', () => {
      this.updateBasketElements();
    });

    this.events.on('card:addBasket', () => {
      if (this.dataModel.selectedCard) {
        this.basketModel.setSelectedCard(this.dataModel.selectedCard);
        this.modal.close(); // Закрываем модальное окно с карточкой товара
        this.events.emit('basket:change'); // Обновляем корзину после добавления товара
      }
    });

    this.events.on('basket:itemRemoved', (item: IProductItem) => {
      this.basketModel.deleteCardToBasket(item);
      this.events.emit('basket:change'); // Обновляем корзину после удаления товара
    });

    this.events.on('card:selected', (item: IProductItem) => {
      this.dataModel.setPreview(item);
      this.events.emit('modalCard:open', item); // Открываем модальное окно с карточкой товара
    });

    this.events.on('modalCard:open', (item: IProductItem) => {
      try {
        const cardPreview = new ProductCard(this.templates.cardPreview, this.events);
        this.modal.render(cardPreview.render(item));
        this.events.emit('modal:open');
      } catch (error) {
        console.error('Ошибка при создании ProductCard:', error);
      }
    });

    this.events.on('success:close', () => {
      this.modal.close();
    });

    this.events.on('productCards:receive', () => {
      this.dataModel.productCards.forEach((item: IProductItem) => {
        const card = new Card(this.templates.cardCatalog, this.events, {
          onClick: () => this.events.emit('card:selected', item),
        });
        this.page.addProductCard(card.render(item));
      });
    });

    this.events.on('contacts:validityChanged', (data: { isValid: boolean }) => {
      this.contactsForm.isValid = data.isValid;
    });
  }

  private updateBasketElements(): void {
    this.basketView.renderBasketCounter(this.basketModel.getCounter());
    this.basketView.renderTotalPrice(this.basketModel.getSumAllProducts());
    this.basketView.updateItems(
      this.basketModel.basketProducts.map((item, index) => {
        const basketItem = new BasketItem(this.templates.cardBasket, this.events, {
          onClick: () => this.events.emit('basket:itemRemoved', item),
        });
        return basketItem.render(item, index + 1);
      })
    );
  }
}