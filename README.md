# WEB-ларёк

## Описание проекта

**WEB-ларёк** — это одностраничный интернет-магазин, предлагающий товары для разработчиков. Пользователи могут просматривать каталог товаров, добавлять их в корзину, а затем оформлять заказ через удобную форму с несколькими шагами.

------------

## Используемый стек

- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" width="30" height="30" /> TypeScript
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/javascript.png" width="30" height="30" /> JavaScript 
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/webpack.png" width="30" height="30" /> Webpack 
- <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/html.png" width="30" height="30" /> HTML 
- <img src="https://www.svgrepo.com/show/374067/scss2.svg" width="30" height="30" /> SCSS 

------------

## Установка и запуск

**Для установки и запуска проекта**

```
npm install
npm run start

```

или

```
yarn
yarn start

```

## Сборка

```
npm run build

```

или

```
yarn build

```

------------
## Описание функционала магазина

 **1. Элементы пользовательского интерфейса**

 **Главный экран:**
 - Логотип и название магазина.
- Навигационное меню в котором только одна кнопка - "**Корзина**"
- Список товаров с изображениями, названиями, ценами.

**Карточка товара:**
- Изображение товара.
- Полное описание (*особенности, характеристики*).
- Цена.
- Кнопка "**Купить**".

**Корзина:**
- Список выбранных товаров с названиями, ценами.
- Возможность удалять товары.
- Общая сумма заказа.
- Кнопка "**Оформить**".

**Форма заказа:**
- Выбор способа оплаты (*онлайн или при получении*).
- Поле для ввода адреса доставки.
- Кнопка "**Далее**".
- После нажатия на кнопку "**Далее**" - Поля для ввода контактных данных (*email, номер телефона*).
- Кнопка оплатить.

**Модальные окна:**
- Окно карточки с товаром, полным описанием, ценой и кнопкой "**Купить**".
- Окно корзины со списком выбранных товаров с названиями, ценами, общей суммой заказа и кнопкой "**Оформить**".
- Окно со способом оплаты (*онлайн\при получении*), вводом адреса доставки и кнопкой "**Далее**".
- Окно с вводом контактной информации (*email\телефон*) и кнопкой "**Оплатить**".
- Окно с изображением галочки, информацией о том, что заказ оформлен, с информацией о том, сколько списано валюты и кнопкой "**За новыми покупками!**".
 
 **2. Как пользователь взаимодействует с приложением**
 
 - Пользователь заходит на главную страницу, просматривает товары.
- Нажимает на карточку товара, чтобы узнать больше, и добавляет товар в корзину нажимая кнопку "**Купить**", при нажатии на кнопку "**Купить**" модальное окно закрывается и пользователь дальше просматривает товары.
- Пользователь, после выбора товаров, открывает корзину, проверяет содержимое и при необходимости вносит изменения (*можно только удалить товар, либо продолжить оформление, либо закрыть модальное окно с корзиной и вернуться к выбору товаров*).
- Заполняет форму заказа - сначала выбирает способ оплаты и вводит адрес доставки, затем после нажатия на кнопку "**Далее**" вводит контактные данные (*номер телефона и email*) и нажимает кнопку "**Оплатить**".

**3. Процесс оформления заказа**

**Добавление товара в корзину:**

- Пользователь нажимает на карточку товара, чтобы узнать больше, и добавляет товар в корзину нажимая кнопку "**Купить**".

**Просмотр корзины:**
- Пользователь, после выбора товаров, открывает корзину, проверяет содержимое и при необходимости вносит изменения (*можно только удалить товар, либо продолжить оформление, либо закрыть модальное окно с корзиной и вернуться к выбору товаров*).

**Заполнение формы заказа:**
- Из корзины пользователь при нажатии на кнопку "**Оформить**" переходит к форме заказа - сначала выбирает способ оплаты и вводит адрес доставки, затем после нажатия на кнопку "**Далее**" вводит контактные данные (*номер телефона и email*) и нажимает кнопку "**Оплатить**".

- В случае ошибок при вводе адреса кнопка "**Далее**" становится неактивной с текстом, рядом с кнопкой - "**Адрес некорректный**".

- В случае ошибок при вводе контактной информации (*email, номер телефона*) кнопка "**Оплатить**" становится неактивной с соответствующим текстом "**Некорректный номер телефона; Некорректный адрес электронной почты**"

### Принцип работы
Проект будет построен на паттерне **MVP**, где каждый компонент системы будет выполнять четко разделенную роль:

-   **Model** — занимается обработкой данных, включая взаимодействие с сервером и хранение данных от пользователя.
-   **View** — отвечает за отображение UI и взаимодействие с пользователем.
-   **Presenter** — его роль выполняет **EventEmitter**, управляющий событиями и связью между **Model** и **View**.

----------

### 1. **Модели данных (Model)**

#### 1.1 **Api**

Это базовый класс для взаимодействия с сервером.

    class Api {
    protected baseUrl: string;

        constructor(baseUrl: string) {
            this.baseUrl = baseUrl;
        }

        protected handleResponse(response: Response): Promise<object> {
            if (response.ok) return response.json();
            else return response.json().then(data => Promise.reject(data.error ?? response.statusText));
        }

        get(uri: string): Promise<object> {
            return fetch(`${this.baseUrl}${uri}`).then(this.handleResponse);
        }

        post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object> {
            return fetch(`${this.baseUrl}${uri}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(this.handleResponse);
        }
    }

**Методы**:

-   `get`: выполняет запрос GET для получения данных.
-   `post`: выполняет запрос POST для отправки данных.

#### 1.2 **ApiModel**

Модель для работы с товарами и заказами, наследует класс `Api`.

    class ApiModel extends Api {
        getListProductCard(): Promise<Product[]> {
            return this.get('/products');
        }

        postOrderLot(order: Order): Promise<any> {
            return this.post('/order', order);
        }
    }

**Методы**:

-   `getListProductCard`: получает список продуктов с сервера.
-   `postOrderLot`: отправляет заказ на сервер.

#### 1.3 **BasketModel**

Модель для работы с данными корзины.

    class BasketModel {
        private items: CartProduct[] = [];

        getCounter(): number {
            return this.items.length;
        }

        getSumAllProducts(): number {
            return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        setSelectedCard(product: CartProduct): void {
            this.items.push(product);
        }

        deleteCardToBasket(productId: string): void {
            this.items = this.items.filter(item => item.productId !== productId);
        }

        clearBasketProducts(): void {
            this.items = [];
        }
    }

**Методы**:

-   `getCounter`: возвращает количество товаров в корзине.
-   `getSumAllProducts`: возвращает общую стоимость товаров.
-   `setSelectedCard`: добавляет товар в корзину.
-   `deleteCardToBasket`: удаляет товар из корзины.
-   `clearBasketProducts`: очищает корзину.

#### 1.4 **FormModel**

Модель для работы с данными, полученными от пользователя.

    class FormModel {
        private orderData: Order = { address: '', contact: { email: '', phone: '' }, items: [] };

        setOrderAddress(address: string): void {
            this.orderData.address = address;
        }

        validateOrder(): boolean {
            return this.orderData.address.length > 0;
        }

        setOrderData(contact: { email: string, phone: string }): void {
            this.orderData.contact = contact;
        }

        validateContacts(): boolean {
            return this.orderData.contact.email.includes('@') && this.orderData.contact.phone.length > 0;
        }

        getOrderLot(): Order {
            return this.orderData;
        }
    }

**Методы**:

-   `setOrderAddress`: сохраняет адрес пользователя.
-   `validateOrder`: проверяет правильность введенного адреса.
-   `setOrderData`: сохраняет контактные данные.
-   `validateContacts`: проверяет валидность контактных данных.
-   `getOrderLot`: возвращает данные о заказе.

----------

### 2. **Компоненты View**

#### 2.1 **Card**

Компонент для отображения карточки товара.

    class Card {
        private element: HTMLElement;

        constructor(elementId: string) {
            this.element = document.getElementById(elementId) as HTMLElement;
        }

        setText(text: string): void {
            this.element.textContent = text;
        }

        setPrice(price: number): void {
            const priceElement = this.element.querySelector('.price') as HTMLElement;
            priceElement.textContent = `$${price}`;
        }
    }

**Методы**:

-   `setText`: обновляет текстовое содержимое элемента.
-   `setPrice`: обновляет цену товара на карточке.

#### 2.2 **Basket**

Компонент для отображения корзины.

    class Basket {
        private basketModel: BasketModel;

        constructor(basketModel: BasketModel) {
            this.basketModel = basketModel;
        }

        renderHeaderBasketCounter(): void {
            const counter = document.querySelector('.basket-counter') as HTMLElement;
            counter.textContent = `${this.basketModel.getCounter()}`;
        }

        renderSumAllProducts(): void {
            const sum = document.querySelector('.basket-total') as HTMLElement;
            sum.textContent = `$${this.basketModel.getSumAllProducts()}`;
        }
    }

**Методы**:

-   `renderHeaderBasketCounter`: отображает количество товаров в корзине.
-   `renderSumAllProducts`: отображает сумму всех товаров в корзине.

----------

### 3. **EventEmitter (Presenter)**

Это класс для работы с событиями, который связывает **Model** и **View**.

    class EventEmitter implements IEvents {
        private events: { [key: string]: Function[] } = {};

        on(event: string, listener: Function): void {
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push(listener);
        }

        off(event: string, listener: Function): void {
            const listeners = this.events[event];
            if (listeners) {
                this.events[event] = listeners.filter(fn => fn !== listener);
            }
        }

        emit(event: string, data: any): void {
            const listeners = this.events[event];
            if (listeners) {
                listeners.forEach(listener => listener(data));
            }
        }

        onAll(listener: Function): void {
            Object.keys(this.events).forEach(event => this.on(event, listener));
        }

        offAll(): void {
            this.events = {};
        }

        trigger(event: string, ...args: any[]): void {
            this.emit(event, ...args);
        }
    }

**Методы**:

-   `on`: подписка на событие.
-   `off`: отписка от события.
-   `emit`: генерация события.
-   `onAll`: подписка на все события.
-   `offAll`: сброс всех подписок.
-   `trigger`: триггер события с передачей данных.

----------

### 4. **Взаимодействие**

**EventEmitter** будет уведомлять **View** о событиях, таких как добавление товара в корзину или отправка заказа.

-   Когда **View** (*например, корзина*) изменяет количество товаров, **EventEmitter** передает уведомление о событии, а **Presenter** обновляет **Model** и **View**.
-   Например, при изменении корзины, **Presenter** обновляет данные корзины в **Model** и вызывает методы для обновления UI в **View**.

----------

### Пример сценария:

1.  **Пользователь добавляет товар в корзину**:
    
    -   **View** вызывает метод `setSelectedCard` из **BasketModel**, чтобы добавить товар в корзину.
    -   **BasketModel** обновляет данные, а **EventEmitter** сообщает **View** обновления.
2.  **Пользователь оформляет заказ**:
    
    -   **View** вызывает методы `setOrderData` и `validateOrder` в **FormModel** для проверки данных.
    -   Если данные валидны, **FormModel** передает заказ в **ApiModel**, который отправляет данные на сервер.
    -   **EventEmitter** уведомляет **View** о результатах, отображая успешное сообщение или ошибку.

----------

## UML схема

![UML-схема](src/images/UMLWEBLAREK.png)

### 1. **User Input**

-  Пользователь взаимодействует с интерфейсом, например, выбирает товар, добавляет его в корзину, или заполняет форму заказа.
-  Ввод данных передается в **DataEntryController**, который занимается логикой обработки пользовательских действий.
### 2. **DataEntryController**
-  Этот контроллер принимает данные от пользователя и организует дальнейшую обработку(*например, добавление товара в корзину или введение адреса*).
- Контроллер передает информацию в **Model**, чтобы обновить состояние приложения, например, добавление товара в корзину или отправка данных заказа.

### 3. **Model**

-  Это центральные компоненты, которые управляют данными и выполняют бизнес-логику:
    
    -   **BasketModel**: управляет товарами в корзине (*добавление, удаление, подсчет количества и стоимости*).
    -   **ApiModel**: взаимодействует с сервером для получения списка товаров и отправки заказов.
    -   **FormModel**: обрабатывает данные формы, такие как адрес и контактные данные пользователя, выполняет валидацию.
-  Модели обновляют данные (*например, количество товаров в корзине или информацию о заказе*).
    

### 4. **Notifies**

-  После обновления данных в моделях, происходит уведомление о изменении данных через **EventEmitter**. Он сигнализирует, что данные изменились, и необходимо обновить интерфейс.

### 5. **EventEmitter**

-  Это компонент, который отвечает за отправку уведомлений между **Model** и **View**. EventEmitter управляет событиями (*например, "товар добавлен в корзину", "заказ оформлен"*) и уведомляет другие компоненты о том, что нужно обновить интерфейс.
-   **Что он делает**:
    -   **on(event, fn)**: Подписывается на событие.
    -   **off(event, fn)**: Отписывается от события.
    -   **emit(event, data)**: Генерирует событие и передает данные.
    -   **trigger()**: Запускает событие.
-   Когда данные обновляются в моделях, **EventEmitter** уведомляет о событии **View** для того, чтобы обновить интерфейс.

### 6. **View**

-  **View** отвечает за отображение данных на экране. Когда **EventEmitter** сообщает о событии - **View** обновляет интерфейс:
    
    -   **renderHeaderBasket**: обновляет отображение количества товаров в корзине.
    -   **renderCardDetail**: отображает детали товара.
    -   **showError**: отображает ошибки (*некорректный email или телефон и т.п.*).
    -   **displayModal**: показывает модальные окна (*форма оформления заказа и т.п.*).
    -   **updateUI**: обновляет интерфейс в зависимости от событий (*при изменении корзины или успешном оформлении заказа и т.п.*).
-  **Viev** получает данные от **Model** через уведомления от **EventEmitter** и обновляет интерфейс для пользователя.
    

### 7. **Интерфейс событий**

- Интерфейс **IEvents** описывает контракт, который должен быть реализован **EventEmitter**. Он включает методы для подписки на события и их генерации.
-  Он обеспечивает возможность регистрации событий и уведомлений о них, позволяя **Presenter** ( **EventEmitter**) взаимодействовать с **Model** и **View**.