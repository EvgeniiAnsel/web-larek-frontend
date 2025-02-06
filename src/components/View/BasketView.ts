import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";

// Интерфейс для представления корзины
export interface IBasketView {
  renderBasketCounter(count: number): void; // Рендерит количество товаров в корзине
  renderTotalPrice(total: number): void; // Рендерит общую стоимость товаров
  updateItems(items: HTMLElement[]): void; // Обновляет список товаров в корзине
  render(): HTMLElement; // Рендерит корзину
}

export class BasketView implements IBasketView {
  private basketElement: HTMLElement; // Элемент корзины
  private titleElement: HTMLElement; // Заголовок корзины
  private itemListElement: HTMLElement; // Список товаров
  private actionButton: HTMLButtonElement; // Кнопка для перехода к оформлению заказа
  private totalPriceElement: HTMLElement; // Элемент для отображения общей стоимости
  private headerButton: HTMLButtonElement; // Кнопка корзины в хедере
  private headerCounter: HTMLElement; // Счётчик товаров в хедере

  // Конструктор, который принимает шаблон и события
  constructor(private template: HTMLTemplateElement, private events: IEvents) {
    const basketClone = template.content.firstElementChild?.cloneNode(true) as HTMLElement;
    this.basketElement = basketClone; // Клонируем шаблон корзины
    this.titleElement = this.basketElement.querySelector('.modal__title')!; // Заголовок корзины
    this.itemListElement = this.basketElement.querySelector('.basket__list')!; // Список товаров
    this.actionButton = this.basketElement.querySelector('.basket__button')! as HTMLButtonElement; // Кнопка оформления заказа
    this.totalPriceElement = this.basketElement.querySelector('.basket__price')!; // Элемент для общей стоимости
    this.headerButton = document.querySelector('.header__basket')! as HTMLButtonElement; // Кнопка корзины в хедере
    this.headerCounter = document.querySelector('.header__basket-counter')!; // Счётчик товаров в хедере
    this.setupEventListeners(); // Привязываем события
    this.clearBasket(); // Очищаем корзину при инициализации
  }

  // Настройка обработчиков событий
  private setupEventListeners(): void {
    this.actionButton.addEventListener('click', () => this.events.emit('order:open')); // Открытие формы оформления заказа
    this.headerButton.addEventListener('click', () => this.events.emit('basket:open')); // Открытие корзины
  }

  // Очищаем корзину
  private clearBasket(): void {
    this.updateItems([]); // Обновляем товары в корзине (пусто)
    this.renderTotalPrice(0); // Устанавливаем общую цену в 0
  }

  // Отображаем количество товаров в корзине (в хедере)
  public renderBasketCounter(count: number): void {
    this.headerCounter.textContent = `${count}`; // Обновляем счётчик в хедере
  }

  // Отображаем общую стоимость товаров в корзине
  public renderTotalPrice(total: number): void {
    this.totalPriceElement.textContent = `${total} синапсов`; // Устанавливаем стоимость
  }

  // Обновляем список товаров в корзине
  public updateItems(items: HTMLElement[]): void {
    if (items.length === 0) { // Если корзина пуста
      this.actionButton.setAttribute('disabled', 'true'); // Делаем кнопку недоступной
      this.itemListElement.replaceChildren(
        createElement('p', { textContent: 'Корзина пуста', className: 'basket__empty' }) // Сообщение о пустой корзине
      );
    } else { // Если корзина не пуста
      this.actionButton.removeAttribute('disabled'); // Делаем кнопку доступной
      this.itemListElement.replaceChildren(...items); // Обновляем список товаров
    }
  }

  // Рендерим корзину
  public render(): HTMLElement {
    this.titleElement.textContent = 'Корзина'; // Устанавливаем заголовок
    return this.basketElement; // Возвращаем элемент корзины
  }
}