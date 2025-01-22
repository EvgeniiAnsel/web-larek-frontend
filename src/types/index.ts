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