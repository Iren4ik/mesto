import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitFormFunction = submitFormFunction;
    this._form = this._popup.querySelector('.popup__input-container');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this._element);
    });
  }

  open = (element) => {
    super.open();
    //при октрытии создаст в экземпляре свойство элемент с этим полученным аргументом
    //надо понимать на какую карточку кликнули
    this._element = element;
  }

  close() {
    super.close();
  }
}