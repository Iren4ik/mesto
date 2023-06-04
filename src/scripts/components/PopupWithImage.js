import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__photo');
    this._title = this._popup.querySelector('.popup__caption');
  }

// Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  
  open = (cardData) => {
    this._photo.src = cardData.link;
    this._photo.alt = `На фотографии ${cardData.title}`;
    this._title.textContent = cardData.title;
    super.open();
  }
}