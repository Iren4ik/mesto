class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._formSelector = config.formSelector; //'.popup__input-container'
    this._inputSelector = config.inputSelector; //'.popup__input'
    this._submitButtonSelector = config.submitButtonSelector; // '.popup__save-btn'
    this._inactiveButtonClass = config.inactiveButtonClass; //'popup__save-btn_disabled'
    this._inputErrorClass = config.inputErrorClass; //'popup__input_valid_error'
    this._errorClass = config.errorClass; //'popup__error_visible'

    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }
  
  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }
  
  _showInputError = (input) => { 
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._errorElement.textContent = input.validationMessage; 
    this._errorElement.classList.add(this._errorClass);
  }
  
  _hideInputError = (input) => {  
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass); 
    this._errorElement.textContent = '';
  }
  
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) { 
      this.deactivateButton();
    } else {
      this.activateButton();
    }
  }
  
  _checkInputValidity = (input) => {  
    if (!input.validity.valid) {
        this._showInputError(input);
      } else {
        this._hideInputError(input);
      }
  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(); 
      });
    });
  }
  
  deactivateButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
  
  activateButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', true);
  }
    
  enableValidation = () => {
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }
}

export { FormValidator };