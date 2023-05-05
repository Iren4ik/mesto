//делает поле красным и показывает снизу ошибку
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

//убирает ошибки
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
};

//проверяет инпут на валидность при наборе символов и выводит предупрждающие сообщения
const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

//ф-я обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
const hasInvalidInput = (inputList) => { 
  return inputList.some((inputElement) => { //false - все поля валидны
    return !inputElement.validity.valid; //не true - нет невалидных полей
  });
};

const inactiveButton = (buttonElement, obj) => {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const activeButton = (buttonElement, obj) => {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

//блокирует кнопку, если хотя бы одно поле невалидно
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) { //проверяем есть ли невалидные поля
    inactiveButton(buttonElement, obj);
  } else {
    activeButton(buttonElement, obj);
  }
}

//навешивает слушатель на все инпуты с проверкой полей и активацией кнопки
const setEventListeners = (formElement, obj) => { 
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, obj);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, obj);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

//навешивает слушатель на все формы в документе и снимает стандартные действия
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
  });
};

enableValidation({
  formSelector: '.popup__input-container', //obj.formSelector
  inputSelector: '.popup__input', //obj.inputSelector
  submitButtonSelector: '.popup__save-btn', // obj.submitButtonSelector
  inactiveButtonClass: 'popup__save-btn_disabled', //obj.inactiveButtonClass
  inputErrorClass: 'popup__input_valid_error', // obj.inputErrorClass
  errorClass: 'popup__error_visible' //obj.errorClass
});

export { activeButton };
export { inactiveButton };