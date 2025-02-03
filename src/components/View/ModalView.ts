import { IEvents } from "../base/events"; // Импортируем интерфейс событий

// Интерфейс для модального окна
export interface IModal {
  open(): void; // Метод открытия модального окна
  close(): void; // Метод закрытия модального окна
  render(content: HTMLElement): void; // Метод рендеринга содержимого модального окна
}

// Класс для реализации модального окна
export class Modal implements IModal {
  private modalContainer: HTMLElement; // Элемент контейнера модального окна
  private closeButton: HTMLButtonElement; // Кнопка для закрытия окна
  private contentElement: HTMLElement; // Элемент для содержимого модального окна
  private pageWrapper: HTMLElement; // Обёртка страницы для блокировки при открытии модалки

  // Конструктор принимает контейнер модального окна и события
  constructor(modalContainer: HTMLElement, private events: IEvents) {
    this.modalContainer = modalContainer;
    this.closeButton = modalContainer.querySelector('.modal__close')! as HTMLButtonElement; // Получаем кнопку закрытия
    this.contentElement = modalContainer.querySelector('.modal__content')!; // Получаем элемент для содержимого
    this.pageWrapper = document.querySelector('.page__wrapper')! as HTMLElement; // Получаем обёртку страницы

    this.setupEventListeners(); // Настроим обработчики событий
  }

  // Метод для настройки обработчиков событий
  private setupEventListeners(): void {
    this.closeButton.addEventListener('click', this.handleCloseClick); // Обработчик для кнопки закрытия
    this.modalContainer.addEventListener('click', this.handleContainerClick); // Обработчик для клика по контейнеру модалки
  }

  // Обработчик клика по кнопке закрытия
  private handleCloseClick = (event: Event): void => {
    event.preventDefault(); // Отменяем стандартное поведение
    this.close(); // Закрываем модальное окно
  };

  // Обработчик клика по контейнеру модального окна (вне его)
  private handleContainerClick = (event: Event): void => {
    // Проверяем, был ли клик сделан по самому контейнеру, а не по внутреннему содержимому
    if (event.target === this.modalContainer) {
      event.preventDefault(); // Отменяем стандартное поведение
      this.close(); // Закрываем модальное окно
    }
  };

  // Метод для добавления или удаления класса
  private toggleClass(element: HTMLElement, className: string, add: boolean): void {
    if (add) {
      element.classList.add(className); // Добавляем класс
    } else {
      element.classList.remove(className); // Убираем класс
    }
  }

  // Метод для открытия модального окна
  public open(): void {
    this.toggleClass(this.modalContainer, 'modal_active', true); // Активируем модалку
    this.toggleClass(this.pageWrapper, 'page__wrapper_locked', true); // Блокируем страницу
  }

  // Метод для закрытия модального окна
  public close(): void {
    this.toggleClass(this.modalContainer, 'modal_active', false); // Деактивируем модалку
    this.toggleClass(this.pageWrapper, 'page__wrapper_locked', false); // Разблокируем страницу
    this.contentElement.replaceChildren(); // Очищаем содержимое модального окна
  }

  // Метод для рендеринга содержимого в модальном окне
  public render(content: HTMLElement): void {
    this.contentElement.replaceChildren(content); // Заменяем содержимое
  }
}
