//делает поле красным и показывает снизу ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_valid_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

//убирает ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_valid_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

//проверяет инпут на валидность при наборе символов и выводит предупрждающие сообщения
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//навешивает слушатель на все инпуты с проверкой полей и активацией кнопки ГДЕ ТО ТУТ НЕ ТАК
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save-btn');
  
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//навешивает слушатель на все формы в документе и снимает стандартные действия
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__input-container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

//проверяет весь инпут на наличие невалидных полей
//ф-я обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?»
const hasInvalidInput = (inputList) => { 
  return inputList.some((inputElement) => { //false - все поля валидны
    return !inputElement.validity.valid; //не true - нет невалидных полей
  });
};

//блокирует кнопку, если хотя бы одно поле невалидно
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { //проверяем есть ли невалидные поля
    buttonElement.classList.add('popup__save-btn_disabled');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save-btn_disabled');
    buttonElement.removeAttribute('disabled', true);
  }
}

enableValidation();