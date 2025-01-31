import { Card } from "@components/View/CardView"; // Импортируем родительский класс Card
import { IEvents } from "@components/base/events"; // Импорт интерфейса событий
import { IActions, IProductItem } from "../../types/Types"; // Импорт интерфейсов для действий и продукта

// Интерфейс для карточки продукта
export interface IProductCard {
  render(data: IProductItem): HTMLElement; // Рендерит карточку продукта
  actionButton: HTMLButtonElement; // Кнопка действия (например, добавить в корзину)
  descriptionElement: HTMLElement; // Элемент для описания продукта
}

// Класс ProductCard, который расширяет класс Card
export class ProductCard extends Card implements IProductCard {
  public readonly actionButton: HTMLButtonElement; // Кнопка для добавления в корзину
  public readonly descriptionElement: HTMLElement; // Элемент для описания товара

  // Конструктор, инициализируем элементы и события
  constructor(
    template: HTMLTemplateElement, // Шаблон для карточки
    events: IEvents, // События
    actions?: IActions // Опциональные действия
  ) {
    super(template, events, actions); // Вызов конструктора родительского класса Card
    const cardElement = this.cardElement; // Получаем элемент карточки
    this.actionButton = cardElement.querySelector(".card__button")!; // Находим кнопку
    this.descriptionElement = cardElement.querySelector(".card__text")!; // Находим элемент с описанием

    // Привязываем обработчик события на клик по кнопке
    this.actionButton.addEventListener("click", () => {
      if (this.actionButton.disabled) return; // Если кнопка заблокирована, не выполняем действие
      events.emit("card:addBasket"); // Генерируем событие добавления в корзину
    });
  }

  // Метод для обновления состояния кнопки (например, доступна ли она для нажатия)
  private updateButtonState(price?: number | null): void {
    const hasValidPrice = price != null && price > 0; // Проверяем, есть ли валидная цена
    this.actionButton.textContent = hasValidPrice ? "Купить" : "Не продается"; // Обновляем текст на кнопке
    this.actionButton.disabled = !hasValidPrice; // Блокируем кнопку, если цена невалидна
  }

  // Метод рендеринга карточки с данными продукта
  render(data: IProductItem): HTMLElement {
    const cardElement = super.render(data); // Вызов родительского метода render
    this.descriptionElement.textContent = data.description || ""; // Устанавливаем описание товара
    this.updateButtonState(data.price); // Обновляем состояние кнопки в зависимости от цены
    return cardElement; // Возвращаем готовый элемент карточки
  }
}
