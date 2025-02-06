import { FormErrors, IOrderLot } from '../../types/Types';
import { IEvents } from '../base/events';
import { addressRegexp, emailRegexp, phoneRegexp } from '../../utils/constants';

// Интерфейс для модели формы заказа
export interface IFormModel {
  payment: string; // Способ оплаты
  email: string; // Электронная почта
  phone: string; // Телефон
  address: string; // Адрес доставки
  setOrderAddress(field: string, value: string): void; // Установить значение поля адреса
  validateOrder(): boolean; // Проверить правильность данных заказа
  setOrderData(field: string, value: string): void; // Установить данные для контактов
  validateContacts(): boolean; // Проверить правильность контактных данных
  getOrderLot(): Omit<IOrderLot, 'total' | 'items'>; // Получить данные заказа
  getErrors(): FormErrors; // Получить ошибки формы
}

export class FormModel implements IFormModel {
  public payment: string = ''; // Начальное значение для способа оплаты
  public email: string = ''; // Начальное значение для email
  public phone: string = ''; // Начальное значение для телефона
  public address: string = ''; // Начальное значение для адреса
  private formErrors: FormErrors = {}; // Ошибки формы

  // Конструктор, принимает объект событий для обработки событий в модели
  constructor(private events: IEvents) {
    // Удаляем вызов setupEventListeners, так как модель не должна заниматься обработкой событий
  }

  // Установить адрес
  public setOrderAddress(field: string, value: string): void {
    if (field === 'address') {
      this.address = value; // Присваиваем значение для адреса
    }
    this.validateOrder(); // Проверяем правильность данных заказа
  }

  // Валидация данных заказа
  public validateOrder(): boolean {
    const errors: FormErrors = {}; // Ошибки формы
    if (!this.address) {
      errors.address = 'Необходимо указать адрес'; // Если адрес пустой
    } else if (!addressRegexp.test(this.address)) {
      errors.address = 'Укажите настоящий адрес'; // Если адрес не соответствует шаблону
    }
    if (!this.payment) {
      errors.payment = 'Выберите способ оплаты'; // Если способ оплаты не выбран
    }
    this.formErrors = errors; // Обновляем ошибки формы
    this.events.emit('formErrors:change', this.formErrors); // Эмитируем изменения ошибок
    return Object.keys(errors).length === 0; // Возвращаем true, если нет ошибок
  }

  // Устанавливаем данные для контактов
  public setOrderData(field: string, value: string): void {
    if (field === 'email') {
      this.email = value; // Присваиваем значение для email
    } else if (field === 'phone') {
      this.phone = value; // Присваиваем значение для телефона
    }
    this.validateContacts(); // Проверяем правильность контактных данных
  }

  // Валидация контактных данных
  public validateContacts(): boolean {
    const errors: FormErrors = {}; // Ошибки формы
    if (!this.email) {
      errors.email = 'Необходимо указать email'; // Если email пустой
    } else if (!emailRegexp.test(this.email)) {
      errors.email = 'Некорректный адрес электронной почты'; // Если email не соответствует шаблону
    }
    // Если телефон начинается с 8, заменяем на +7
    if (this.phone.startsWith('8')) {
      this.phone = '+7' + this.phone.slice(1);
    }
    if (!this.phone) {
      errors.phone = 'Необходимо указать телефон'; // Если телефон пустой
    } else if (!phoneRegexp.test(this.phone)) {
      errors.phone = 'Некорректный формат номера телефона'; // Если телефон не соответствует шаблону
    }
    this.formErrors = errors; // Обновляем ошибки формы
    this.events.emit('formErrors:change', this.formErrors); // Эмитируем изменения ошибок
    return Object.keys(errors).length === 0; // Возвращаем true, если нет ошибок
  }

  // Установить способ оплаты
  public setPayment(payment: string): void {
    this.payment = payment; // Присваиваем способ оплаты
    console.log('Установлен способ оплаты:', this.payment);
    this.validateOrder(); // Проверяем правильность данных заказа
  }

  // Получить объект заказа для отправки
  public getOrderLot(): Omit<IOrderLot, 'total' | 'items'> {
    const orderLot: Omit<IOrderLot, 'total' | 'items'> = {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
    return orderLot;
  }

  // Получить ошибки формы
  public getErrors(): FormErrors {
    return this.formErrors;
  }
}
