import { IEvents } from '../base/events';
import { IProductItem } from '../../types/Types';

// Интерфейс для модели корзины
export interface IBasketModel {
  basketProducts: IProductItem[]; // Список товаров в корзине
  setSelectedCard(item: IProductItem): void; // Добавить товар в корзину
  deleteCardToBasket(item: IProductItem): void; // Удалить товар из корзины
  clearBasketProducts(): void; // Очистить всю корзину
  getCounter(): number; // Получить количество товаров в корзине
  getSumAllProducts(): number; // Получить общую стоимость всех товаров в корзине
}

// Класс, реализующий модель корзины покупок
export class BasketModel implements IBasketModel {
  private _basketProducts: IProductItem[] = []; // Приватное свойство для хранения списка товаров в корзине

  constructor() {}

  // Геттер для получения списка товаров в корзине
  get basketProducts(): IProductItem[] {
    return this._basketProducts;
  }

  // Метод для добавления товара в корзину
  public setSelectedCard(item: IProductItem): void {
    this._basketProducts.push(item); // Добавляем товар в массив товаров корзины
  }

  // Метод для удаления товара из корзины
  public deleteCardToBasket(item: IProductItem): void {
    const index = this._basketProducts.findIndex(product => product.id === item.id); // Находим индекс товара в корзине
    if (index !== -1) {
      this._basketProducts.splice(index, 1); // Удаляем товар из корзины
    }
  }

  // Метод для очистки корзины
  public clearBasketProducts(): void {
    this._basketProducts = []; // Очищаем массив товаров корзины
  }

  // Метод для получения количества товаров в корзине
  public getCounter(): number {
    return this._basketProducts.length; // Возвращаем количество товаров в корзине
  }

  // Метод для получения общей стоимости всех товаров в корзине
  public getSumAllProducts(): number {
    return this._basketProducts.reduce((sum, product) => sum + (product.price || 0), 0); // Суммируем цену всех товаров в корзине
  }
}
