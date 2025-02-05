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
## Содержание
- [Установка и запуск](#установка-и-запуск)
- [Описание функционала магазина](#описание-функционала-магазина)
- [Модели (Model)](#модели-model)
  - [1. Api](#1-api)
  - [2. ApiModel](#2-apimodel)
  - [3. BasketModel](#3-basketmodel)
  - [4. DataModel](#4-datamodel)
  - [5. FormModel](#5-formmodel)
- [Представления (View)](#представления-view)
  - [1. Card](#1-card)
  - [2. ProductCard](#2-productcard)
  - [3. BasketItem](#3-basketitem)
  - [4. BasketView](#4-basketview)
  - [5. OrderForm](#5-orderform)
  - [6. FormContacts](#6-formcontacts)
  - [7. Modal](#7-modal)
  - [8. Success](#8-success)
- [Презентер (Presenter)](#презентер-presenter)
  - [1. EventEmitter](#1-eventemitter)
- [Типы данных и интерфейсы](#типы-данных-и-интерфейсы)
- [Взаимодействие компонентов и процессы](#взаимодействие-компонентов-и-процессы)
-  [Процесс работы приложения](#процесс-работы-приложения)

---
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

[Назад к содержанию](#содержание)


---

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

[Назад к содержанию](#содержание)

---
## Модели (Model)

### <a id="1-api"></a>1. Api
Предоставляет базовые методы для выполнения HTTP-запросов к серверу.

**Методы:**  
- **`get(uri: string): Promise<object>`**  
  Выполняет **GET**-запрос по базовому **URL** (определяется в ApiModel) с указанным `uri` и возвращает промис с ответом в формате **JSON**.

- **`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>`**  
  Выполняет запрос (**POST**, **PUT** или **DELETE**) по базовому **URL** с заданным `uri` и данными в JSON; возвращает промис с ответом.

- **`handleResponse(response: Response): Promise<object>`**  
  Обрабатывает HTTP-ответ: если запрос успешен (`response.ok`), возвращает распарсенный **JSON**; иначе выбрасывает ошибку с сообщением из ответа или статусом.

[Назад к содержанию](#содержание)

---

### <a id="2-apimodel"></a>2. ApiModel
Централизует взаимодействие с внешним **API** для получения списка товаров и отправки заказов.

**Поля:**  
- **`cdn: string`**  
  Базовый **URL** для формирования полного пути к изображениям товаров.
- **`items: IProductItem[]`**  
  Массив товаров (результат запроса к **API**).

**Методы:**  
- **`getListProductCard(): Promise<IProductItem[]>`**  
  Выполняет **GET**-запрос на эндпоинт `/product`; получает объект с общим количеством и массивом товаров, для каждого товара дополняет поле `image` значением из `cdn` и возвращает массив товаров.

- **`postOrderLot(order: IOrderLot): Promise<IOrderResult>`**  
  Отправляет объект заказа (типа `IOrderLot`) на эндпоинт `/order` и возвращает промис с результатом (типа `IOrderResult`).

[Назад к содержанию](#содержание)

---

### <a id="3-basketmodel"></a>3. BasketModel
Управляет состоянием корзины покупок.

**Поля:**  
- **`_basketProducts: IProductItem[]`**  
  Приватное поле – массив товаров, добавленных в корзину.

**Методы:**  
- **`setSelectedCard(item: IProductItem): void`**  
  Добавляет товар `item` в корзину (вставка в массив).

- **`deleteCardToBasket(item: IProductItem): void`**  
  Находит товар в массиве по идентификатору и удаляет его (с помощью **splice**).

- **`clearBasketProducts(): void`**  
  Очищает корзину, присваивая пустой массив.

- **`getCounter(): number`**  
  Возвращает количество товаров в корзине (длину массива).

- **`getSumAllProducts(): number`**  
  Вычисляет и возвращает суммарную стоимость товаров в корзине, суммируя цены с проверкой на null.

- **`getProductIds(): string[]`**
  Возвращает массив идентификаторов товаров в корзине.

[Назад к содержанию](#содержание)

---

### <a id="4-datamodel"></a>4. DataModel
Управляет данными карточек товаров и выбранным товаром для предпросмотра.

**Поля:**  
- **`_productCards: IProductItem[]`**  
  Приватный массив карточек товаров, полученных с сервера.
- **`_selectedCard: IProductItem | null`**  
  Приватное поле – выбранная карточка для детального просмотра (null, если не выбрано).

**Методы:**  
- **Сеттер `productCards(data: IProductItem[]): void`**  
  Сохраняет массив карточек товаров и эмитит событие `productCards:receive`.

- **Геттер `productCards(): IProductItem[]`**  
  Возвращает текущий массив карточек.

- **`setPreview(item: IProductItem): void`**  
  Устанавливает товар для предпросмотра (присваивает значение в ```_selectedCard```) и эмитит событие `modalCard:open`, передавая `item`.

- **Геттер `selectedCard(): IProductItem | null`**  
  Возвращает выбранный товар для детального просмотра.

[Назад к содержанию](#содержание)

---

### <a id="5-formmodel"></a>5. FormModel
Управляет данными формы заказа, валидацией и сбором информации для отправки заказа.

**Поля:**  
- **`payment: string`**  
  Способ оплаты, выбранный пользователем.
  
- **`email: string`**  
  Email пользователя.
  
- **`phone: string`**  
  Номер телефона.
  
- **`address: string`**  
  Адрес доставки.
  
- **`total: number`**  
  Итоговая сумма заказа.
  
- **`items: string[]`**  
  Массив идентификаторов товаров в заказе.
  
- **`formErrors: FormErrors`**  
  Объект с ошибками валидации.

**Методы:**  
- **`setOrderAddress(field: string, value: string): void`**  
  Если `field` равен «**address**», устанавливает значение адреса; затем запускает валидацию заказа.

- **`validateOrder(): boolean`**  
  Проверяет корректность адреса (с использованием регулярного выражения) и наличие способа оплаты; обновляет `formErrors`, эмитит событие `formErrors:change` и возвращает true, если ошибок нет.

- **`setOrderData(field: string, value: string): void`**  
  Устанавливает значение для поля `email` или `phone` и инициирует валидацию контактных данных.

- **`validateContacts(): boolean`**  
  Валидирует поля `email` и `phone` (при необходимости корректирует номер, заменяя «8» на «+7»); обновляет `formErrors`, эмитит событие и возвращает true, если данные корректны.

- **`setPayment(payment: string): void`**  
  Устанавливает выбранный способ оплаты и выполняет повторную валидацию заказа.

- **`getOrderLot(): IOrderLot`**  
  Собирает данные (`payment`, `email`, `phone`, `address`, `total`, `items`) в объект типа `IOrderLot` и возвращает его.

- **`getErrors(): FormErrors`**  
  Возвращает текущий объект ошибок.


[Назад к содержанию](#содержание)

---

## Представления (View)

### <a id="1-card"></a>1. Card
Базовый компонент для отображения карточки товара в каталоге.

**Поля:**  
- **`cardElement: HTMLElement`**  
  Корневой DOM-элемент карточки, созданный на основе шаблона.
  
- **`elements: Record<string, HTMLElement | HTMLImageElement>`**  
  Объект с ключевыми элементами карточки (категория, заголовок, изображение, цена).
  
- **`categoryColors: Record<string, string>`**  
  Словарь, сопоставляющий текст категории с CSS-классами для цветового оформления.

**Методы:**  
- **`cloneTemplate(): HTMLElement`**  
  Клонирует шаблон карточки (ищет элемент с классом `.card`) и возвращает новый элемент.
  
- **`getElements(): Record<string, HTMLElement | HTMLImageElement>`**  
  Извлекает из клонированного шаблона элементы по селекторам (например, `.card__category`, `.card__title`, `.card__image`, `.card__price`) и возвращает их в виде объекта.
  
- **`getElement<T extends HTMLElement = HTMLElement>(selector: string): T`**  
  Универсально получает элемент по селектору внутри карточки; если элемент не найден – выбрасывает ошибку.
  
- **`setupEventListeners(): void`**  
  Если в параметрах конструктора переданы действия (например, обработчик клика), устанавливает соответствующие обработчики на карточку.
  
- **`formatPrice(price: number | null): string`**  
  Форматирует цену: если `price` равен null, возвращает строку «Бесценно»; иначе – возвращает цену с единицами измерения.
  
- **`setCategory(category: string): void`**  
  Устанавливает текст элемента категории и применяет CSS-класс, используя словарь `categoryColors`.
  
- **`render(data: IProductItem): HTMLElement`**  
  Заполняет карточку данными о товаре (категория, название, изображение, цена) и возвращает готовый DOM-элемент.

[Назад к содержанию](#содержание)

---

### <a id="2-productcard"></a>2. ProductCard
Расширяет функционал компонента **Card** для отображения детальной информации о товаре в модальном окне.

**Наследует от:** Card

**Дополнительные поля:**  
- **`actionButton: HTMLButtonElement`**  
  Кнопка для добавления товара в корзину.
  
- **`descriptionElement: HTMLElement`**  
  Элемент для вывода подробного описания товара.

**Методы:**  
- **`updateButtonState(price?: number | null): void`**  
  Обновляет текст и состояние кнопки (активна/неактивна) в зависимости от корректности цены.
  
- **`render(data: IProductItem): HTMLElement`**  
  Вызывает базовый метод `render()` из **Card** для заполнения стандартных данных, затем устанавливает текст описания и обновляет состояние кнопки; возвращает готовый DOM-элемент.

[Назад к содержанию](#содержание)

---

### <a id="3-basketitem"></a>3. BasketItem
Отвечает за отображение отдельного товара внутри корзины.

**Поля:**  
- **`_basketItem: HTMLElement`**  
  Корневой DOM-элемент элемента корзины, созданный на основе шаблона.
  
- **`_elements: { index: HTMLElement; title: HTMLElement; price: HTMLElement; buttonDelete: HTMLButtonElement }`**  
  Объект с элементами: номер товара, название, цена, кнопка удаления.
  
- **`_actions?: IActions`**  
  Объект с действиями, например, обработчик клика для удаления товара.

**Методы:**  
- **`cloneTemplate(): HTMLElement`**  
  Клонирует шаблон элемента корзины и возвращает новый DOM-элемент.
  
- **`setupElements(): { index, title, price, buttonDelete }`**  
  Извлекает из шаблона основные элементы по селекторам и возвращает их в виде объекта.
  
- **`getElement<T extends HTMLElement = HTMLElement>(selector: string): T`**  
  Универсальный метод для получения элемента внутри элемента корзины; выбрасывает ошибку, если элемент не найден.
  
- **`bindEvents(): void`**  
  Если в `_actions` передан обработчик `onClick`, устанавливает его для кнопки удаления (с вызовом `event.stopPropagation()`).
  
- **`formatPrice(value: number | null): string`**  
  Форматирует цену товара для отображения.
  
- **`updateText(element: HTMLElement, value: string): void`**  
  Обновляет текстовое содержимое элемента, если новое значение отличается от текущего.
  
- **`render(data: IProductItem, index: number): HTMLElement`**  
  Заполняет шаблон данными о товаре (номер, название, цена) и возвращает готовый DOM-элемент.

[Назад к содержанию](#содержание)

---

### <a id="4-basketview"></a>4. BasketView
Управляет отображением корзины покупок, включая список товаров, общую стоимость и счётчик в шапке.

**Поля:**  
- **`basketElement: HTMLElement`**  
  Корневой элемент корзины (обычно модальное окно).
  
- **`titleElement: HTMLElement`**  
  Заголовок корзины.
  
- **`itemListElement: HTMLElement`**  
  Контейнер для списка товаров.
  
- **`actionButton: HTMLButtonElement`**  
  Кнопка для оформления заказа.
  
- **`totalPriceElement: HTMLElement`**  
  Элемент для отображения общей стоимости заказа.
  
- **`headerButton: HTMLButtonElement`**  
  Кнопка корзины в шапке сайта.
  
- **`headerCounter: HTMLElement`**  
  Элемент, отображающий количество товаров в корзине (в шапке).

**Методы:**  
- **`setupEventListeners(): void`**  
  Устанавливает обработчики кликов: на кнопке оформления заказа (событие `order:open`) и на кнопке корзины в шапке (событие `basket:open`).
  
- **`clearBasket(): void`**  
  Очищает корзину, обновляя список товаров и устанавливая общую стоимость в ноль.
  
- **`renderBasketCounter(count: number): void`**  
  Обновляет счётчик товаров в шапке.
  
- **`renderTotalPrice(total: number): void`**  
  Отображает общую стоимость заказа.
  
- **`updateItems(items: HTMLElement[]): void`**  
  Обновляет DOM-элемент списка товаров: если список пуст – выводит сообщение «Корзина пуста», иначе заменяет содержимое.
  
- **`render(): HTMLElement`**  
  Устанавливает заголовок корзины и возвращает готовый DOM-элемент.

[Назад к содержанию](#содержание)

---

### <a id="5-orderform"></a>5. OrderForm
Форма для ввода данных заказа: выбор способа оплаты и ввод адреса доставки.

**Поля:**  
- **`formElement: HTMLFormElement`**  
  Корневой DOM-элемент формы заказа.
  
- **`paymentButtons: HTMLButtonElement[]`**  
  Массив кнопок для выбора способа оплаты.
  
- **`submitButton: HTMLButtonElement`**  
  Кнопка отправки формы (переход к следующему этапу).
  
- **`errorDisplay: HTMLElement`**  
  Элемент для вывода сообщений об ошибках.
  
- **`selectedPayment: string | null`**  
  Локальное поле для хранения выбранного способа оплаты.

**Методы:**  
- **`setupEventListeners(): void`**  
  Устанавливает обработчики событий: клики по кнопкам оплаты (вызывает `selectPayment` и эмитит `order:paymentMethodSelected`), ввод в поле адреса (эмитит `order:addressFieldChanged`) и сабмит формы (эмитит `order:submit`).
  
- **`selectPayment(payment: string): void`**  
  Устанавливает выбранный способ оплаты, обновляет визуальное состояние кнопок (добавляя/удаляя класс «button_alt-active») и вызывает `updateSubmitButton`.
  
- **`updateSubmitButton(): void`**  
  Проверяет наличие выбранного способа оплаты и валидность адреса (не менее 7 символов); включает или отключает кнопку отправки формы.
  
- **`render(): HTMLElement`**  
  Рендерит форму заказа и возвращает готовый DOM-элемент.

[Назад к содержанию](#содержание)

---

### <a id="6-formcontacts"></a>6. FormContacts
Форма для ввода контактной информации пользователя (email, телефон) при оформлении заказа.

**Поля:**  
- **`formElement: HTMLFormElement`**  
  Корневой DOM-элемент формы контактов.
  
- **`submitButton: HTMLButtonElement`**  
  Кнопка отправки формы контактов.
  
- **`errorDisplay: HTMLElement`**  
  Элемент для вывода сообщений об ошибках.

- **`emailInput: HTMLInputElement`**
   Поле email.

- **`phoneInput: HTMLInputElement`**
  - Поле телефон.

**Методы:**  
- **`setupEventListeners(): void`**  
  Устанавливает обработчики событий: для ввода в поля `email` и `phone` (эмитит `contacts:inputChanged`) и для сабмита формы (эмитит `contacts:submit`).
  
- **`updateSubmitButton(): void`**  
  Проверяет заполненность полей `email` и `phone` (без лишних пробелов) и обновляет состояние кнопки отправки (disabled).
  
- **`render(): HTMLElement`**  
  Рендерит форму контактов и возвращает готовый DOM-элемент.

[Назад к содержанию](#содержание)

---

### <a id="7-modal"></a>7. Modal
Управляет модальными окнами для вывода дополнительной информации (детальная карточка товара, форма заказа, уведомления и т.д.).

**Поля:**  
- **`modalContainer: HTMLElement`**  
  Контейнер модального окна.
  
- **`closeButton: HTMLButtonElement`**  
  Кнопка закрытия модального окна.
  
- **`contentElement: HTMLElement`**  
  Контейнер для динамического содержимого модального окна.
  
- **`pageWrapper: HTMLElement`**  
  Элемент обёртки страницы (для блокировки прокрутки при открытии модального окна).

**Методы:**  
- **`setupEventListeners(): void`**  
  Устанавливает обработчики событий для закрытия модального окна: по клику на кнопку закрытия, по клику на фон, с предотвращением закрытия при клике внутри содержимого.
  
- **`toggleClass(element: HTMLElement, className: string, add: boolean): void`**  
  Добавляет или удаляет указанный CSS-класс у элемента в зависимости от параметра `add`.
  
- **`open(): void`**  
  Открывает модальное окно, добавляя активный класс для `modalContainer` и блокируя прокрутку страницы (добавляет класс к `pageWrapper`).
  
- **`close(): void`**  
  Закрывает модальное окно, удаляя активные классы и очищая содержимое `contentElement`.
  
- **`render(content: HTMLElement): void`**  
  Вставляет переданный контент в `contentElement` и открывает модальное окно.

[Назад к содержанию](#содержание)

---

### <a id="8-success"></a>8. Success
Выводит уведомление об успешном оформлении заказа с информацией о списанной сумме.

**Поля:**  
- **`successElement: HTMLElement`**  
  Корневой DOM-элемент уведомления.
  
- **`descriptionElement: HTMLElement`**  
  Элемент, выводящий текст уведомления (например, «Списано X синапсов»).
  
- **`closeButton: HTMLButtonElement`**  
  Кнопка закрытия уведомления.

**Методы:**  
- **`setupEventListeners(): void`**  
  Устанавливает обработчик для кнопки закрытия, который при клике эмитит событие `success:close`.
  
- **`render(total: number): HTMLElement`**  
  Обновляет текст в `descriptionElement`, подставляя сумму `total`, и возвращает готовый DOM-элемент уведомления.

[Назад к содержанию](#содержание)

---

## Презентер (Presenter)

### <a id="1-eventemitter"></a>1. EventEmitter
Связывает компоненты через события, обеспечивая передачу данных между **M** (**Model**) и **V** (**View**).

**Поля:**  
- ``_events: Map<EventName, Set<Subscriber>>``
 Скрытое поле для хранения подписчиков - это основа всей логики `EventEmitter`, позволяющее хранить подписчиков и управлять ими.

**Методы:**  
- **`on<T extends object>(event: string, callback: (data: T) => void): void`**  
  Подписывает обработчик на событие с именем `event`.
  
- **`off(event: string, callback: Function): void`**  
  Отписывает указанный обработчик от события `event`.
  
- **`emit<T extends object>(event: string, data?: T): void`**  
  Генерирует событие `event` с опциональными данными `data`.
  
- **`onAll(callback: (event: { eventName: string; data: unknown }) => void): void`**  
  Подписывает обработчик на все события (например, для логирования).
  
- **`offAll(): void`**  
  Удаляет все обработчики событий.
  
- **`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void`**  
  Возвращает функцию-триггер, которая при вызове генерирует событие `event` с объединёнными данными из `data` и `context`.

[Назад к содержанию](#содержание)

---

## Типы данных и интерфейсы

**IProductItem**  
Полевая структура, описывающая товар:
- `id: string` – уникальный идентификатор товара.
- `category: string` – категория товара.
- `title: string` – название товара.
- `image: string` – путь к изображению товара.
- `price: number | null` – цена товара (если цена отсутствует, значение null).
- `description?: string` – подробное описание (опционально).
- `name: string` – имя товара.

**IOrderLot**  
Структура данных для заказа:
- `payment: string` – способ оплаты.
- `email: string` – email пользователя.
- `phone: string` – номер телефона.
- `address: string` – адрес доставки.
- `total: number` – итоговая сумма заказа.
- `items: string[]` – список идентификаторов товаров.

**IOrderResult**  
Структура для результата отправки заказа:
- `success: boolean` – флаг успешного оформления заказа.
- `message: string` – сообщение с пояснением результата.

**FormErrors**  
Опциональные поля для ошибок валидации:
- `address?: string`
- `payment?: string`
- `email?: string`
- `phone?: string`

**IActions**  
Определяет действия, например, обработчик клика:
- `onClick?: (event: Event) => void`

**IEvents**  
Определяет интерфейс для работы с системой событий:
- **`on<T extends object>(event: string, callback: (data: T) => void): void`**  
  Регистрирует обработчик для события `event`, который будет вызван с данными типа T.
  
- **`off(event: string, callback: Function): void`**  
  Удаляет ранее зарегистрированный обработчик для события `event`.
  
- **`emit<T extends object>(event: string, data?: T): void`**  
  Генерирует событие `event`, передавая опциональные данные типа T, что приводит к вызову всех зарегистрированных обработчиков.
  
- **`onAll(callback: (event: { eventName: string; data: unknown }) => void): void`**  
  Регистрирует обработчик, который будет вызываться для всех событий, что полезно для логирования или аналитики.
  
- **`offAll(): void`**  
  Удаляет все зарегистрированные обработчики.
  
- **`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void`**  
  Возвращает функцию, которая при вызове генерирует событие `event` с объединёнными данными из параметров `data` и `context`.

[Назад к содержанию](#содержание)

---

## Взаимодействие компонентов и процессы

- **Выбор товара:**  
  При выборе товара (событие `card:selected`) выбранный товар устанавливается в **DataModel**.

- **Добавление в корзину:**  
  При нажатии на кнопку **«Купить»** (событие `card:addBasket`) выбранный товар добавляется в корзину через **BasketModel**; затем **BasketView** обновляет счётчик и общую стоимость.

- **Просмотр корзины:**  
  При клике на кнопку корзины (событие `basket:open`) **BasketView** рендерит корзину, показывая список товаров, общую стоимость и счётчик.

- **Удаление товара:**  
  При удалении товара (событие `basket:itemRemoved`) корзина обновляется: пересчитывается количество товаров и сумма.

- **Оформление заказа:**  
  При оформлении заказа (событие `order:open`) открывается форма заказа (**OrderForm**); данные валидируются в **FormModel**. При успешной валидации открывается форма контактов (событие `contacts:open`).

- **Отправка заказа:**  
  После ввода контактной информации и успешной проверки (событие `contacts:submit`) генерируется событие `success:open`; заказ отправляется через **ApiModel**, отображается уведомление (**Success**) и корзина очищается.

- **Обработка ошибок:**  
  При возникновении ошибок генерируется событие `formErrors:change`, после чего **OrderForm** или **FormContacts** обновляют вывод ошибок и блокируют кнопку отправки.

[Назад к содержанию](#содержание)


---

## Процесс работы приложения

### Добавление товара в корзину

1.  Пользователь кликает на товар.
2.  Генерируется событие `card:selected`, которое обновляет выбранный товар в модели `DataModel`.
3.  Генерируется событие `card:addBasket`, которое добавляет товар в корзину через `BasketModel`.
4.  Компонент `BasketView` обновляет отображение корзины, показывая текущее количество товаров и их стоимость.
---
### Оформление заказа

1.  Пользователь заполняет форму заказа.
2.  Генерируется событие `order:submit`, которое передает данные в `FormModel`.
3.  `FormModel` валидирует данные формы.
4.  В случае успешной валидации, данные отправляются на сервер через `ApiModel`, и появляется сообщение об успешном заказе.


[Назад к содержанию](#содержание)