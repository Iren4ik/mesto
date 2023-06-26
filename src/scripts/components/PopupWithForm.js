import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this._submitFormFunction = submitFormFunction;
    this._form = this._popup.querySelector('.popup__input-container');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.popup__save-btn');
    this._defaultSubmitText = this._submitBtn.value;
  }

  //собираем данные с инпутов в объект
  _getInputValue() { 
    this._value = {};
    this._inputList.forEach(input => {
      this._value[input.name] = input.value;
    });  
    return this._value;
  }

  // для заполнения инпутов данными из профиля в момент открытия попапа 
  setInputValue(configInfo) {
    this._inputList.forEach(input => {
      input.value = configInfo[input.name];
    })
  }

  renderLoading(isLoading){
    if (isLoading) {
      this._submitBtn.value = `${this._submitBtn.value}...`;
    } else {
      this._submitBtn.value = this._defaultSubmitText;
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this._getInputValue());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}