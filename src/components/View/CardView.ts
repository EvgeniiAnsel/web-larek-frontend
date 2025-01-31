import { IActions, IProductItem } from "../../types/Types"; // Импортируем типы для действий и продукта
import { IEvents } from "../base/events"; // Импорт интерфейса для работы с событиями

// Интерфейс для карточки продукта
export interface ICard {
  render(data: IProductItem): HTMLElement; // Метод для рендеринга карточки
}

// Класс Card, который реализует интерфейс ICard
export class Card implements ICard {
  protected readonly cardElement: HTMLElement; // Элемент карточки
  private readonly elements: Record<string, HTMLElement | HTMLImageElement>; // Элементы карточки (категория, заголовок, изображение, цена)
  private readonly categoryColors: Record<string, string> = { // Сопоставление категорий с цветами
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  };

  // Конструктор принимает шаблон, события и действия
  constructor(
    private readonly template: HTMLTemplateElement, // Шаблон карточки
    private readonly events: IEvents, // События
    private readonly actions?: IActions // Опциональные действия
  ) {
    this.cardElement = this.cloneTemplate(); // Клонируем шаблон
    this.elements = this.getElements(); // Инициализируем элементы карточки
    this.setupEventListeners(); // Устанавливаем обработчики событий
  }

  // Метод для клонирования шаблона карточки
  private cloneTemplate(): HTMLElement {
    const card = this.template.content.querySelector(".card")?.cloneNode(true) as HTMLElement;
    if (!card) {
      throw new Error("Card template not found or invalid.");
    }
    return card; // Возвращаем клонированный элемент карточки
  }

  // Метод для получения элементов из шаблона карточки
  private getElements(): Record<string, HTMLElement | HTMLImageElement> {
    const category = this.getElement(".card__category"); // Категория товара
    const title = this.getElement(".card__title"); // Заголовок товара
    const image = this.getElement<HTMLImageElement>(".card__image"); // Изображение товара
    const price = this.getElement(".card__price"); // Цена товара
    return { category, title, image, price }; // Возвращаем объект с элементами
  }

  // Метод для получения конкретного элемента по селектору
  protected getElement<T extends HTMLElement = HTMLElement>(selector: string): T {
    const element = this.cardElement.querySelector<T>(selector);
    if (!element) {
      throw new Error(`Element with selector "${selector}" not found.`);
    }
    return element; // Возвращаем найденный элемент
  }

  // Метод для настройки обработчиков событий
  private setupEventListeners(): void {
    if (this.actions?.onClick) {
      this.cardElement.addEventListener("click", this.actions.onClick); // Привязываем событие клика, если передано действие
    }
  }

  // Метод для форматирования цены
  private formatPrice(price: number | null): string {
    return price === null ? "Бесценно" : `${price} синапсов`; // Если цена null, возвращаем "Бесценно", иначе форматируем цену
  }

  // Метод для установки категории товара
  private setCategory(category: string): void {
    const categoryElement = this.elements.category as HTMLElement;
    categoryElement.textContent = category; // Устанавливаем текст категории
    categoryElement.className = `card__category card__category_${this.categoryColors[category] || "default"}`; // Устанавливаем класс в зависимости от категории
  }

  // Метод рендеринга карточки товара
  render(data: IProductItem): HTMLElement {
    this.setCategory(data.category); // Устанавливаем категорию товара
    (this.elements.title as HTMLElement).textContent = data.title; // Устанавливаем заголовок товара
    const imageElement = this.elements.image as HTMLImageElement;
    imageElement.src = data.image; // Устанавливаем изображение товара
    imageElement.alt = data.title; // Устанавливаем alt для изображения
    (this.elements.price as HTMLElement).textContent = this.formatPrice(data.price); // Устанавливаем цену товара
    return this.cardElement; // Возвращаем элемент карточки
  }
}
