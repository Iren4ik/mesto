import { initialCards } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// элементы секции profile:
const profileName = document.querySelector('.profile__intro-name');
const profileJob = document.querySelector('.profile__intro-job');
const btnOpenPopupProfile = document.querySelector('.profile__intro-edit-btn'); 
const photoElement = document.querySelector('.popup__photo');
const photoTitle = document.querySelector('.popup__caption');
// элементы editProfilePopup:
const popupEditProfile = document.querySelector('.popup_feat_edit-form'); 
const formEditProfile = document.forms['edit-form'];
const inputNameEditProfile = document.querySelector('.popup__input_type_name');
const inputJobEditProfile = document.querySelector('.popup__input_type_job');
// элементы addCardPopup:
const popupAddCard = document.querySelector('.popup_feat_add-cards');
const formAddCard = document.forms['add-form'];
const inputCaptionAddForm = document.querySelector('.popup__input_type_caption');
const inputLinkAddForm = document.querySelector('.popup__input_type_link');
const btnOpenPopupCard = document.querySelector('.profile__add-btn');
// элементы showPicturePopup:
const popupShowPicture = document.querySelector('.popup_feat_show-image');
// другие элементы:
const cardsContainer = document.querySelector('.elements__items');

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
  openPopup(popupShowPicture);
}

//Открытие попапов
const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('click', handlePopupClose);
  document.addEventListener('keydown', closePressTheEsc);
}


//Открытие формы редактирования
const openEditForm = () => {
  inputNameEditProfile.value =  profileName.textContent;
  inputJobEditProfile.value = profileJob.textContent;
  formProfileValidator.resetError();
  openPopup(popupEditProfile);
}

//Открытие формы добавления карточки
const openAddForm = () => {
  formAddCard.reset();
  formAddValidator.resetError();
  openPopup(popupAddCard);
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
    closePopup(document.querySelector('.popup_opened'));
  }
}; 

//Закрытие попапов через esc
const closePressTheEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

//Отправка формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = inputNameEditProfile.value;
  profileJob.textContent = inputJobEditProfile.value;
  closePopup(popupEditProfile);
}

//Отправка формы добавления карточки
const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); 
  const cardAdd = {
    name: inputCaptionAddForm.value,
    link: inputLinkAddForm.value
  };
  cardsContainer.prepend(createNewCard(cardAdd));
  closePopup(popupAddCard);
}

//Добавление на страницу первых 6 карточек
initialCards.forEach((element) => {   
  cardsContainer.append(createNewCard(element));
});

//Создание экземпляров для валидации
const formProfileValidator = new FormValidator(config, formEditProfile);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddCard);
formAddValidator.enableValidation();

btnOpenPopupProfile.addEventListener('click', openEditForm);
btnOpenPopupCard.addEventListener('click', openAddForm);
formEditProfile.addEventListener('submit', handleProfileFormSubmit); 
formAddCard.addEventListener('submit', handleAddFormSubmit);