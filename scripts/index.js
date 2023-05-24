import { initialCards } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// элементы секции profile:
const profileName = document.querySelector('.profile__intro-name');
const profileJob = document.querySelector('.profile__intro-job');
const openEditProfileBtn = document.querySelector('.profile__intro-edit-btn');
const photoElement = document.querySelector('.popup__photo');
const photoTitle = document.querySelector('.popup__caption');
// элементы editProfilePopup:
const editProfilePopup = document.querySelector('.popup_feat_edit-form');
const editProfileForm = document.forms['edit-form'];
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileJobInput = document.querySelector('.popup__input_type_job');
// элементы addCardPopup:
const addFormPopup = document.querySelector('.popup_feat_add-cards');
const addCardsForm = document.forms['add-form'];
const addFormCaptionInput = document.querySelector('.popup__input_type_caption');
const addFormLinkInput = document.querySelector('.popup__input_type_link');
const openAddCardsBtn = document.querySelector('.profile__add-btn');
// элементы showPicturePopup:
const showPicturePopup = document.querySelector('.popup_feat_show-image');
// другие элементы:
const cardsContainer = document.querySelector('.elements__items');
const popupList = Array.from(document.querySelectorAll('.popup'));

const config = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_valid_error',
  errorClass: 'popup__error_visible',
};

//создание новой карточки
const createNewCard = (element) => {
  const card = new Card (element, openPhoto);
  const cardElement = card.createCard();
  return cardElement;
}

//Открытие фото
const openPhoto = (cardData) => {
  photoElement.src = cardData.link;
  photoElement.alt = cardData.name;
  photoTitle.textContent = cardData.name;
  openPopup(showPicturePopup);
}

//Открытие попапов
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('click', handlePopupClose);
  document.addEventListener('keydown', closePressTheEsc);
}

//Открытие формы редактирования
const openEditForm = () => {
  editProfileNameInput.value =  profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
  formProfileValidator.activateButton();
  openPopup(editProfilePopup);
}

//Открытие формы добавления карточки
const openAddForm = () => {
  addCardsForm.reset();
  formAddValidator.deactivateButton();
  openPopup(addFormPopup);
}

//Закрытие попапов
const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('click', handlePopupClose);
  document.removeEventListener('keydown', closePressTheEsc);
}

//Закрытие попапов через оверлей и крестик
const handlePopupClose = (evt) => {
  const isOverlay = evt.target.classList.contains('popup'); 
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');
  if (isOverlay || isCloseBtn) {
    popupList.forEach(closePopup);
  }
}; 

//Закрытие попапов через esc
const closePressTheEsc = (evt) => {
  if (evt.key === 'Escape') {
    popupList.forEach(closePopup);
  }
}

//Отправка формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;
  closePopup(editProfilePopup);
}

//Отправка формы добавления карточки
const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); 
  const cardAdd = {
    name: addFormCaptionInput.value,
    link: addFormLinkInput.value
  };
  cardsContainer.prepend(createNewCard(cardAdd));
  closePopup(addFormPopup);
}

//Добавление на страницу первых 6 карточек
initialCards.forEach((element) => {   
  cardsContainer.append(createNewCard(element));
});

//Создание экземпляров для валидации
const formProfileValidator = new FormValidator(config, editProfileForm);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(config, addCardsForm);
formAddValidator.enableValidation();

openEditProfileBtn.addEventListener('click', openEditForm);
openAddCardsBtn.addEventListener('click', openAddForm);
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
addCardsForm.addEventListener('submit', handleAddFormSubmit);