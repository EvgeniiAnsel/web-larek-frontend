import './scss/styles.scss';

// M - Модели данных
import { ApiModel } from './components/Model/ApiModel';
import { FormModel } from './components/Model/FormModel';
import { DataModel } from './components/Model/DataModel';
import { BasketModel } from './components/Model/BasketModel';

// V - Виды представлений
import { Card } from '@components/View/CardView';
import { Modal } from '@components/View/ModalView';
import { Success } from '@components/View/SuccessView';
import { BasketView } from '@components/View/BasketView';
import { OrderForm } from '@components/View/FormOrderView';
import { BasketItem } from '@components/View/BasketItemView';
import { ProductCard } from '@components/View/CardPreviewView';
import { FormContacts } from '@components/View/FormContactView';

// P - Утилиты и компоненты
import { ensureElement } from './utils/utils';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { IProductItem, FormErrors } from './types/Types';

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

  // Шаблоны, загружаемые из HTML
  const templates = {
    order: document.querySelector('#order') as HTMLTemplateElement, // Шаблон для формы заказа
    basket: document.querySelector('#basket') as HTMLTemplateElement, // Шаблон для корзины
    success: document.querySelector('#success') as HTMLTemplateElement, // Шаблон для успешного заказа
    contacts: document.querySelector('#contacts') as HTMLTemplateElement, // Шаблон для контактов
    cardBasket: document.querySelector('#card-basket') as HTMLTemplateElement, // Шаблон для карточки корзины
    cardCatalog: document.querySelector('#card-catalog') as HTMLTemplateElement, // Шаблон для карточки каталога
    cardPreview: document.querySelector('#card-preview') as HTMLTemplateElement, // Шаблон для карточки товара
  };

  // Проверка наличия шаблона card-preview
  if (!templates.cardPreview) {
    console.error('Шаблон card-preview не найден.');
    return;
  }

  // Инициализация моделей
  const events = new EventEmitter();
  const basketModel = new BasketModel(); // Модель для корзины
  const formModel = new FormModel(events); // Модель для формы
  const dataModel = new DataModel(events); // Модель для данных
  const apiModel = new ApiModel(CDN_URL, API_URL); // Модель для работы с API
  const orderForm = new OrderForm(templates.order, events); // Форма заказа
  const basketView = new BasketView(templates.basket, events); // Представление корзины
  const successMessage = new Success(templates.success, events); // Представление успеха
  const contactsForm = new FormContacts(templates.contacts, events); // Представление формы контактов
  const modal = new Modal(ensureElement('#modal-container'), events); // Модальное окно

  // Подписка на события

  // Событие закрытия успешного сообщения
  events.on('success:close', () => {
    modal.close();
    events.emit('modal:close');
  });

  // Открытие и закрытие модальных окон
  events.on('modal:open', () => {
    modal.open();
  });

  events.on('modal:close', () => {
    modal.close();
  });

  // Обработка получения карточек товаров
  events.on('productCards:receive', () => {
    dataModel.productCards.forEach((item) => {
      const card = new Card(templates.cardCatalog, events, {
        onClick: () => events.emit('card:selected', item), // При клике на карточку товара
      });
      ensureElement('.gallery').append(card.render(item));
    });
  });

  // Обработка выбора карточки товара
  events.on('card:selected', (item: IProductItem) => {
    dataModel.setPreview(item);
  });

  // Открытие модального окна с подробной карточкой товара
  events.on('modalCard:open', (item: IProductItem) => {
    try {
      const cardPreview = new ProductCard(templates.cardPreview, events);
      modal.render(cardPreview.render(item)); // Рендеринг карточки товара в модальном окне
      events.emit('modal:open');
    } catch (error) {
      console.error('Ошибка при создании ProductCard:', error);
    }
  });

  // Добавление товара в корзину
  events.on('card:addBasket', () => {
    if (dataModel.selectedCard) {
      basketModel.setSelectedCard(dataModel.selectedCard);
      basketView.renderBasketCounter(basketModel.getCounter());
      modal.close();
      events.emit('modal:close');
    }
  });

  // Открытие корзины
  events.on('basket:open', () => {
    basketView.renderTotalPrice(basketModel.getSumAllProducts()); // Отображение общей цены
    basketView.updateItems(
      basketModel.basketProducts.map((item, index) => {
        const basketItem = new BasketItem(templates.cardBasket, events, {
          onClick: () => events.emit('basket:itemRemoved', item), // При клике на товар в корзине
        });
        return basketItem.render(item, index + 1);
      })
    );
    modal.render(basketView.render());
    events.emit('modal:open');
  });

  // Удаление товара из корзины
  events.on('basket:itemRemoved', (item: IProductItem) => {
    basketModel.deleteCardToBasket(item);
    basketView.renderBasketCounter(basketModel.getCounter());
    basketView.renderTotalPrice(basketModel.getSumAllProducts());
    basketView.updateItems(
      basketModel.basketProducts.map((item, index) => {
        const basketItem = new BasketItem(templates.cardBasket, events, {
          onClick: () => events.emit('basket:itemRemoved', item),
        });
        return basketItem.render(item, index + 1);
      })
    );
    modal.render(basketView.render());
    events.emit('modal:open');
  });

  // Открытие формы оформления заказа
  events.on('order:open', () => {
    modal.render(orderForm.render());
    formModel.setItems(basketModel.basketProducts.map((item) => item.id)); // Устанавливаем товары из корзины
    formModel.setTotal(basketModel.getSumAllProducts()); // Устанавливаем общую сумму
    events.emit('modal:open');
  });

  // Выбор метода оплаты
  events.on('order:paymentMethodSelected', (data: { payment: string }) => {
    formModel.setPayment(data.payment);
    formModel.validateOrder(); // Валидируем данные заказа
  });

  // Изменение адреса доставки
  events.on('order:addressFieldChanged', (data: { field: string; value: string }) => {
    formModel.setOrderAddress(data.field, data.value);
  });

  // Отправка заказа
  events.on('order:submit', () => {
    if (formModel.validateOrder()) {
      events.emit('contacts:open'); // Переход к форме контактов
    } else {
      events.emit('formErrors:change', formModel.getErrors()); // Отображаем ошибки
    }
  });

  // Открытие формы контактов
  events.on('contacts:open', () => {
    console.log('contacts:open');
    modal.render(contactsForm.render());
    formModel.validateContacts(); // Валидируем контакты
    events.emit('modal:open');
  });

  // Изменение данных контактов
  events.on('contacts:inputChanged', (data: { field: string; value: string }) => {
    formModel.setOrderData(data.field, data.value);
  });

  // Отправка формы контактов
  events.on('contacts:submit', () => {
    if (formModel.validateContacts()) {
      events.emit('success:open'); // Переход к успешному сообщению
    } else {
      events.emit('formErrors:change', formModel.getErrors());
    }
  });

  // Обработка ошибок формы
  events.on('formErrors:change', (errors: FormErrors) => {
    const orderFormElement = document.querySelector('form[name="order"]') as HTMLFormElement;
    const contactsFormElement = document.querySelector('form[name="contacts"]') as HTMLFormElement;

    if (orderFormElement) {
      const errorDisplay = orderFormElement.querySelector('.form__errors')!;
      const submitButton = orderFormElement.querySelector('.order__button') as HTMLButtonElement;
      const orderErrors = errors.address || errors.payment ? [errors.address, errors.payment].filter(Boolean).join('; ') : '';
      errorDisplay.textContent = orderErrors;
      submitButton.disabled = Object.keys(errors).length !== 0;
    }

    if (contactsFormElement) {
      const errorDisplay = contactsFormElement.querySelector('.form__errors')!;
      const submitButton = contactsFormElement.querySelector('.button') as HTMLButtonElement;
      const contactErrors = errors.email || errors.phone ? [errors.email, errors.phone].filter(Boolean).join('; ') : '';
      errorDisplay.textContent = contactErrors;
      submitButton.disabled = Object.keys(errors).length !== 0;
    }
  });

  // Открытие успешного сообщения
  events.on('success:open', () => {
    const orderLot = formModel.getOrderLot();
    
    // Получаем данные из корзины
    const total = basketModel.getSumAllProducts(); // Получаем стоимость из корзины
    const items = basketModel.getProductIds(); // Получаем список товаров (id) из корзины
  
    // Формируем новый объект для отправки
    const orderData = {
      ...orderLot, // Данные формы
      total, // Добавляем стоимость
      items, // Добавляем список товаров
    };
  
    // Отправляем заказ
    apiModel.postOrderLot(orderData)
      .then(() => {
        modal.render(successMessage.render(formModel.getTotal())); // Показ успешного сообщения
        basketModel.clearBasketProducts(); // Очистка корзины
        basketView.renderBasketCounter(basketModel.getCounter()); // Обновление счетчика корзины
        events.emit('modal:open');
      })
      .catch((error) => {
        console.log(error);
        const contactsFormElement = document.querySelector('form[name="contacts"]') as HTMLFormElement;
        const errorDisplay = contactsFormElement.querySelector('.form__errors')!;
        errorDisplay.textContent = 'Не удалось оформить заказ. Проверьте данные и попробуйте снова.'; // Ошибка оформления заказа
        const submitButton = contactsFormElement.querySelector('.button') as HTMLButtonElement;
        submitButton.disabled = false;
        events.emit('modal:open');
      });
  });


  // Загрузка карточек товаров
  apiModel
    .getListProductCard()
    .then((data: IProductItem[]) => {
      dataModel.productCards = data; // Сохранение полученных данных
    })
    .catch((error) => console.log(error));
});
