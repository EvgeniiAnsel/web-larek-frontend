import { IProductItem } from "../../types/Types";
import { IEvents } from "../base/events";

// Интерфейс для модели данных
export interface IDataModel {
  productCards: IProductItem[]; // Список товаров
  selectedCard: IProductItem; // Выбранный товар
  setPreview(item: IProductItem): void; // Установить выбранный товар для предпросмотра
}

export class ProductList implements IDataModel {
  private _productCards: IProductItem[] = []; // Массив товаров
  private _selectedCard: IProductItem | null = null; // Выбранный товар (может быть null, если товар не выбран)

  constructor(private events: IEvents) {
    // Конструктор принимает объект событий, который будет использоваться для эмита событий
  }

  // Устанавливаем список товаров и эмитим событие о получении товаров
  set productCards(data: IProductItem[]) {
    this._productCards = data; // Присваиваем переданный массив товаров
    this.events.emit('productCards:receive'); // Эмитим событие о получении товаров
  }

  // Получаем список товаров
  get productCards(): IProductItem[] {
    return this._productCards; // Возвращаем текущий список товаров
  }

  // Устанавливаем выбранный товар для предпросмотра и эмитим событие для открытия модального окна
  public setPreview(item: IProductItem): void {
    this._selectedCard = item; // Присваиваем выбранный товар
    this.events.emit('modalCard:open', item); // Эмитим событие для открытия модального окна с товаром
  }

  // Получаем выбранный товар (или null, если товар не выбран)
  get selectedCard(): IProductItem | null {
    return this._selectedCard; // Возвращаем выбранный товар
  }
}
