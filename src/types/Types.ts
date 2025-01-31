// Интерфейс для ошибок формы, где могут быть ошибки для разных полей
export interface FormErrors {
  address?: string;
  payment?: string;
  email?: string;
  phone?: string;
}

// Интерфейс для данных заказа
export interface IOrderLot {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

// Интерфейс для результата обработки заказа
export interface IOrderResult {
  success: boolean;
  message: string;
}

// Интерфейс для данных товара
export interface IProductItem {
  id: string;
  category: string;
  title: string;
  image: string;
  price: number | null;
  description?: string;
  name: string;
}

// Интерфейс для действий, которые можно выполнить при клике
export interface IActions {
  onClick?: (event: Event) => void;
}

// Интерфейс для модели формы с полями и методами для работы с ними
export interface IFormModel {
  paymentMethod: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
  setOrderAddress(field: string, value: string): void;
  validateOrder(): Promise<boolean>;
  setOrderData(field: string, value: string): void;
  validateContacts(): Promise<boolean>;
  getOrderLot(): IOrderLot;
  getErrors(): FormErrors;
  renderContactsForm(template: HTMLTemplateElement): { formElement: HTMLFormElement; isValid: boolean; errorMessages: string[] };
}

// Интерфейс для работы с событиями
export interface IEvents {
  on<T extends object>(event: string, callback: (data: T) => void): void;
  off(event: string, callback: Function): void;
  emit<T extends object>(event: string, data?: T): void;
  onAll(callback: (event: { eventName: string; data: unknown }) => void): void;
  offAll(): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
