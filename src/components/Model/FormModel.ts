import { IEvents } from '../base/events';
import { FormErrors, IOrderLot } from '../../types/Types';

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
  getOrderLot(): IOrderLot; // Получить данные заказа
  getErrors(): FormErrors; // Получить ошибки формы
}

export class FormModel implements IFormModel {
  public payment: string = ''; // Начальное значение для способа оплаты
  public email: string = ''; // Начальное значение для email
  public phone: string = ''; // Начальное значение для телефона
  public address: string = ''; // Начальное значение для адреса
  public total: number = 0; // Начальная сумма заказа
  public items: string[] = []; // Начальный список товаров
  private formErrors: FormErrors = {}; // Ошибки формы

  // Конструктор, принимает объект событий для обработки событий в модели
  constructor(private events: IEvents) {
    this.setupEventListeners(); // Настроим обработчики событий
  }

  // Настройка обработчиков событий
  private setupEventListeners(): void {
    // Обработчик выбора метода оплаты
    this.events.on('order:paymentMethodSelected', (data: { payment: string }) => {
      this.setPayment(data.payment);
      this.validateOrder();
    });

    // Обработчик изменения поля адреса
    this.events.on('order:addressFieldChanged', (data: { field: string; value: string }) => {
      this.setOrderAddress(data.field, data.value);
    });

    // Обработчик изменения данных контакта
    this.events.on('contacts:inputChanged', (data: { field: string; value: string }) => {
      this.setOrderData(data.field, data.value);
    });

    // Обработчик отправки заказа
    this.events.on('order:submit', () => {
      if (this.validateOrder()) {
        this.events.emit('contacts:open'); // Открыть форму для ввода контактных данных
      } else {
        this.events.emit('formErrors:change', this.formErrors); // Эмитировать ошибку, если данные не прошли валидацию
      }
    });

    // Обработчик отправки контактных данных
    this.events.on('contacts:submit', () => {
      if (this.validateContacts()) {
        this.events.emit('success:open'); // Отправка успешного заказа
      } else {
        this.events.emit('formErrors:change', this.formErrors); // Эмитировать ошибку, если контактные данные некорректны
      }
    });

    // Обработчик валидации контактных данных
    this.events.on('contacts:validate', () => {
      const isValid = this.validateContacts();
      this.events.emit('contacts:validityChanged', { isValid }); // Передаем объект с полем isValid
    });
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
    const addressRegexp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/; // Регулярное выражение для проверки адреса
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
    const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Регулярное выражение для email
    const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/; // Регулярное выражение для телефона
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

  // Получить общую сумму заказа
  public getTotal(): number {
    return this.total;
  }

  // Установить общую сумму заказа
  public setTotal(value: number): void {
    this.total = value;
  }

  // Получить список товаров
  public getItems(): string[] {
    return this.items;
  }

  // Установить список товаров
  public setItems(value: string[]): void {
    this.items = value;
  }

  // Получить объект заказа для отправки
  public getOrderLot(): IOrderLot {
    const orderLot = {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
      total: this.total,
      items: this.items,
    };
    console.log('Отправляемый заказ:', orderLot);
    return orderLot;
  }

  // Получить ошибки формы
  public getErrors(): FormErrors {
    return this.formErrors;
  }
}
