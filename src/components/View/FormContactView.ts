import { IEvents } from "../base/events"; // Импортируем интерфейс событий

// Интерфейс для формы контактов
export interface IContactsForm {
  formElement: HTMLFormElement; // Элемент формы
  submitButton: HTMLButtonElement; // Кнопка отправки
  errorDisplay: HTMLElement; // Элемент для отображения ошибок
  emailInput: HTMLInputElement; // Поле для email
  phoneInput: HTMLInputElement; // Поле для телефона
  setupEventListeners(): void; // Метод для настройки обработчиков событий
  updateSubmitButton(): void; // Метод для обновления состояния кнопки отправки
  set isValid(isValid: boolean); // Сеттер для установки валидности формы
  set errorMessages(messages: string[]); // Сеттер для отображения ошибок
  render(): HTMLElement; // Метод для рендеринга формы
}

// Класс для формы контактов
export class FormContacts implements IContactsForm {
  public formElement: HTMLFormElement; // Элемент формы
  public submitButton: HTMLButtonElement; // Кнопка отправки
  public errorDisplay: HTMLElement; // Элемент для ошибок
  public emailInput: HTMLInputElement; // Поле для email
  public phoneInput: HTMLInputElement; // Поле для телефона

  // Конструктор принимает шаблон формы и события
  constructor(template: HTMLTemplateElement, private events: IEvents) {
    this.formElement = template.content.querySelector('.form')!.cloneNode(true) as HTMLFormElement; // Клонируем шаблон формы
    this.submitButton = this.formElement.querySelector('.button')! as HTMLButtonElement; // Находим кнопку отправки
    this.errorDisplay = this.formElement.querySelector('.form__errors')!; // Элемент для отображения ошибок
    this.emailInput = this.formElement.querySelector('input[name="email"]')! as HTMLInputElement; // Поле email
    this.phoneInput = this.formElement.querySelector('input[name="phone"]')! as HTMLInputElement; // Поле phone

    this.setupEventListeners(); // Настроим обработчики событий
    this.updateSubmitButton(); // Обновим состояние кнопки отправки
  }

  // Метод для настройки обработчиков событий
  public setupEventListeners(): void {
    // Слушаем изменения в полях формы
    this.formElement.addEventListener('input', (event: Event) => {
      const input = event.target as HTMLInputElement; // Получаем измененное поле
      const fieldName = input.name; // Имя поля
      const fieldValue = input.value; // Значение поля
      this.events.emit('contacts:inputChanged', { field: fieldName, value: fieldValue }); // Отправляем событие с изменением поля
    });

    // Слушаем отправку формы
    this.formElement.addEventListener('submit', (event: Event) => {
      event.preventDefault(); // Отменяем стандартное поведение отправки формы
      this.events.emit('contacts:submit'); // Отправляем событие отправки формы
    });
  }

  // Метод для обновления состояния кнопки отправки
  public updateSubmitButton(): void {
    const email = this.emailInput.value.trim(); // Очистка от пробелов
    const phone = this.phoneInput.value.trim(); // Очистка от пробелов
    const isValid = email && phone; // Проверка валидности (оба поля должны быть заполнены)
    this.submitButton.disabled = !isValid; // Если одно из полей пустое, кнопка будет заблокирована
  }

  // Сеттер для установки валидности формы
  public set isValid(isValid: boolean) {
    this.submitButton.disabled = !isValid; // Включаем/выключаем кнопку отправки в зависимости от валидности
  }

  // Сеттер для отображения ошибок
  public set errorMessages(messages: string[]) {
    this.errorDisplay.textContent = messages.join('; '); // Отображаем все сообщения об ошибках через точку с запятой
    this.updateSubmitButton(); // Обновляем состояние кнопки отправки
  }

  // Метод для рендеринга формы
  public render(): HTMLElement {
    return this.formElement; // Возвращаем саму форму, что нужно отрисовать
  }
}