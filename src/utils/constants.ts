export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const addressRegexp = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/; // Регулярное выражение для проверки адреса
export const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // Регулярное выражение для email
export const phoneRegexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/; // Регулярное выражение для телефона

export const settings = {};