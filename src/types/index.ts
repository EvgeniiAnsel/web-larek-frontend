// Типы для данных товара
export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

// Тип для товара в корзине
export interface CartProduct {
    productId: string;
    quantity: number;
}

// Тип для заказа
export interface Order {
    address: string;
    paymentMethod: 'credit' | 'paypal';
    contact: {
        email: string;
        phone: string;
    };
    items: CartProduct[];
}

// Типы для событий
export enum EventTypes {
    ADD_PRODUCT_TO_CART = 'add_product_to_cart',
    REMOVE_PRODUCT_FROM_CART = 'remove_product_from_cart',
    ORDER_PLACED = 'order_placed',
}

// Типы для событийного брокера
export type EventPayloads = {
    [EventTypes.ADD_PRODUCT_TO_CART]: { productId: string };
    [EventTypes.REMOVE_PRODUCT_FROM_CART]: { productId: string };
    [EventTypes.ORDER_PLACED]: { order: Order };
};

// Интерфейсы моделей
export interface ProductModel {
    toView(data: Product): ProductCardView;
}

export interface CartModel {
    toView(data: CartProduct[]): CartView;
}

// Интерфейсы отображений (Views)
export interface ProductView {
    render(data: ProductCardView): void;
}

export interface CartView {
    render(data: CartProduct[]): void;
}

// Типы для данных отображения
export interface ProductCardView {
    id: string;
    title: string;
    price: string; // форматированная цена
    shortDescription: string;
}
