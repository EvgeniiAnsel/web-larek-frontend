import { IEvents } from "../base/events";

// Интерфейс для компонента успешного завершения заказа
export interface ISuccess {
  render(total: number): HTMLElement; // Метод рендеринга успешного сообщения с указанной суммой
}

// Класс для реализации компонента успешного завершения заказа
export class Success implements ISuccess {
  private successElement: HTMLElement; // Элемент контейнера для успешного сообщения
  private descriptionElement: HTMLElement; // Элемент для описания успешного завершения
  private closeButton: HTMLButtonElement; // Кнопка для закрытия сообщения

  // Конструктор принимает шаблон и события
  constructor(template: HTMLTemplateElement, private events: IEvents) {
    this.successElement = template.content.querySelector('.order-success')!.cloneNode(true) as HTMLElement; // Клонируем шаблон
    this.descriptionElement = this.successElement.querySelector('.order-success__description')!; // Получаем описание
    this.closeButton = this.successElement.querySelector('.order-success__close')! as HTMLButtonElement; // Получаем кнопку закрытия

    this.setupEventListeners(); // Настроим обработчики событий
  }

  // Метод для настройки обработчиков событий
  private setupEventListeners(): void {
    this.closeButton.addEventListener('click', () => this.events.emit('success:close')); // Обработчик для закрытия успешного сообщения
  }

  // Метод для рендеринга успешного сообщения с итоговой суммой
  public render(total: number): HTMLElement {
    this.descriptionElement.textContent = `Списано ${total} синапсов`; // Заменяем текст в описании
    return this.successElement; // Возвращаем элемент с рендеренным сообщением
  }
}
