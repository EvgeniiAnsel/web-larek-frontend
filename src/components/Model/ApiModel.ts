import { ApiListResponse, Api } from '../base/api'
import { IOrderLot, IOrderResult, IProductItem } from '../../types/Types';

// Интерфейс для модели API
export interface IApiModel {
  cdn: string; // URL для получения изображений
  items: IProductItem[]; // Список товаров
  getListProductCard: () => Promise<IProductItem[]>; // Получить список товаров с сервера
  postOrderLot: (order: IOrderLot) => Promise<IOrderResult>; // Отправить заказ на сервер
}

// Класс, реализующий API-модель, расширяющий базовый класс Api
export class ApiModel extends Api {
  cdn: string; // URL для получения изображений
  items: IProductItem[]; // Список товаров

  // Конструктор класса, инициализирует URL для CDN, базовый URL и опции для запроса
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options); // Вызов конструктора базового класса Api
    this.cdn = cdn; // Устанавливаем URL для получения изображений
  }

  // Метод для получения списка товаров с сервера
  getListProductCard(): Promise<IProductItem[]> {
    return this.get('/product') // Отправляем GET-запрос на эндпоинт /product
      .then((data: ApiListResponse<IProductItem>) =>
        data.items.map((item) => ({
          ...item, // Копируем данные о товаре
          image: this.cdn + item.image, // Формируем полный URL для изображения товара
        }))
      );
  }

  // Метод для отправки заказа на сервер
  postOrderLot(order: IOrderLot): Promise<IOrderResult> {
    return this.post(`/order`, order) // Отправляем POST-запрос на эндпоинт /order с данными заказа
      .then((data: IOrderResult) => data); // Возвращаем результат заказа
  }
}
