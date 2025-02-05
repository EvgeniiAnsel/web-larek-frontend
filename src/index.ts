import './scss/styles.scss';
import { ApiModel } from './components/Model/ApiModel';
import { FormModel } from './components/Model/FormModel';
import { ProductList } from './components/Model/DataModel';
import { BasketModel } from './components/Model/BasketModel';

import { Modal } from '@components/View/ModalView';
import { Success } from '@components/View/SuccessView';
import { OrderForm } from '@components/View/FormOrderView';
import { BasketView } from '@components/View/BasketView';
import { FormContacts } from '@components/View/FormContactView';

import { ensureElement, Page } from './utils/utils';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { IProductItem, FormErrors } from './types/Types';
import { Presenter } from './components/Presenter/Presenter';

document.addEventListener('DOMContentLoaded', () => {
  const templates = {
    order: document.querySelector('#order') as HTMLTemplateElement,
    basket: document.querySelector('#basket') as HTMLTemplateElement,
    success: document.querySelector('#success') as HTMLTemplateElement,
    contacts: document.querySelector('#contacts') as HTMLTemplateElement,
    cardBasket: document.querySelector('#card-basket') as HTMLTemplateElement,
    cardCatalog: document.querySelector('#card-catalog') as HTMLTemplateElement,
    cardPreview: document.querySelector('#card-preview') as HTMLTemplateElement,
  };

  if (!templates.cardPreview) {
    console.error('Шаблон card-preview не найден.');
    return;
  }

  const page = new Page();
  const events = new EventEmitter();
  const basketModel = new BasketModel();
  const formModel = new FormModel(events);
  const dataModel = new ProductList(events);
  const apiModel = new ApiModel(CDN_URL, API_URL); 
  const orderForm = new OrderForm(templates.order, events);
  const basketView = new BasketView(templates.basket, events);
  const successMessage = new Success(templates.success, events);
  const contactsForm = new FormContacts(templates.contacts, events);
  const modal = new Modal(ensureElement('#modal-container'), events);

  // Создаем экземпляр Presenter
  const presenter = new Presenter(
    events,
    formModel,
    basketModel,
    apiModel,
    orderForm,
    basketView,
    successMessage,
    contactsForm,
    modal,
    page,
    templates,
    dataModel
  );

  // Загрузка карточек товаров
  apiModel
    .getListProductCard()
    .then((data: IProductItem[]) => {
      dataModel.productCards = data; // Сохранение полученных данных
    })
    .catch((error) => console.log(error));

  // Инициализация начальных данных
  events.emit('productCards:receive');

  // Привязываем обработчики событий для отображения ошибок
  events.on('formErrors:change', (errors: FormErrors) => {
    const orderErrors = Object.values(errors).filter(Boolean) as string[];
    const contactErrors = Object.values(errors).filter(Boolean) as string[];

    page.renderOrderFormErrors(orderErrors);
    page.renderContactsFormErrors(contactErrors);
  });
});
