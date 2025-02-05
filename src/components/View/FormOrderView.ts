import { IEvents } from "../base/events"; // Импортируем интерфейс событий

// Интерфейс для формы заказа
export interface IOrderForm {
  formElement: HTMLFormElement; // Элемент формы
  paymentButtons: HTMLButtonElement[]; // Кнопки выбора метода оплаты
  submitButton: HTMLButtonElement; // Кнопка отправки формы
  errorDisplay: HTMLElement; // Элемент для отображения ошибок
  render(): HTMLElement; // Метод для рендеринга формы
  setupEventListeners(): void; // Метод для настройки обработчиков событий
  updateSubmitButton(): void; // Метод для обновления состояния кнопки отправки
}

// Класс для формы заказа
export class OrderForm implements IOrderForm {
  public formElement: HTMLFormElement; // Элемент формы
  public paymentButtons: HTMLButtonElement[]; // Кнопки выбора метода оплаты
  public submitButton: HTMLButtonElement; // Кнопка отправки формы
  public errorDisplay: HTMLElement; // Элемент для ошибок
  private addressInput: HTMLInputElement; // Поле для адреса
  private selectedPayment: string | null = null; // Переменная для выбранного метода оплаты

  // Конструктор принимает шаблон формы и события
  constructor(template: HTMLTemplateElement, private events: IEvents) {
    this.formElement = template.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement; // Клонируем шаблон формы
    this.paymentButtons = Array.from(this.formElement.querySelectorAll('.button_alt')) as HTMLButtonElement[]; // Получаем все кнопки оплаты
    this.submitButton = this.formElement.querySelector('.order__button')! as HTMLButtonElement; // Кнопка отправки
    this.errorDisplay = this.formElement.querySelector('.form__errors')!; // Элемент для ошибок
    this.addressInput = this.formElement.querySelector('input[name="address"]')! as HTMLInputElement; // Поле для адреса
    this.setupEventListeners(); // Настроим обработчики событий
    this.updateSubmitButton(); // Обновим состояние кнопки отправки
  }

  // Метод для настройки обработчиков событий
  public setupEventListeners(): void {
    // Для каждой кнопки метода оплаты добавляем обработчик событий
    this.paymentButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.selectPayment(button.name); // Выбираем метод оплаты
        this.events.emit('order:paymentMethodSelected', { payment: button.name }); // Отправляем событие с выбранным методом
      });
    });

    // Слушаем изменения в полях формы (например, адрес)
    this.formElement.addEventListener('input', (event: Event) => {
      const input = event.target as HTMLInputElement; // Получаем поле
      const fieldName = input.name; // Имя поля
      const fieldValue = input.value; // Значение поля
      this.events.emit('order:addressFieldChanged', { field: fieldName, value: fieldValue }); // Отправляем событие с изменениями
    });

    // Обработчик отправки формы
    this.formElement.addEventListener('submit', (event: Event) => {
      event.preventDefault(); // Отменяем стандартную отправку
      this.events.emit('order:submit'); // Отправляем событие отправки формы
    });

    // Слушаем событие изменения валидности формы
    this.events.on('order:validityChanged', (data: { isValid: boolean }) => {
      this.isValid = data.isValid;
    });
  }

  // Метод для выбора метода оплаты
  private selectPayment(payment: string): void {
    this.selectedPayment = payment; // Устанавливаем выбранный метод
    // Обновляем состояние кнопок оплаты
    this.paymentButtons.forEach(button => {
      button.classList.toggle('button_alt-active', button.name === payment); // Активируем кнопку, которая соответствует выбранному методу
    });
    this.updateSubmitButton(); // Обновляем кнопку отправки
  }

  // Метод для обновления состояния кнопки отправки
  public updateSubmitButton(): void {
    const address = this.addressInput.value.trim(); // Убираем лишние пробелы
    // Проверяем, что метод оплаты выбран, а адрес валиден (не меньше 7 символов)
    const isValid = !!this.selectedPayment && address.length >= 7;
    this.events.emit('order:validityChanged', { isValid });
  }

  // Сеттер для установки валидности формы
  public set isValid(isValid: boolean) {
    this.submitButton.disabled = !isValid; // Включаем/выключаем кнопку отправки в зависимости от валидности
  }

  // Сеттер для отображения ошибок
  public set errorMessages(messages: string[]) {
    this.errorDisplay.textContent = messages.join('; '); // Отображаем ошибки через точку с запятой
  }

  // Метод для рендеринга формы
  public render(): HTMLElement {
    return this.formElement; // Возвращаем саму форму
  }
}
