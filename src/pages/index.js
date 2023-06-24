import './index.css';

import {
  initialCards,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  btnOpenPopupProfile,
  btnOpenPopupCard,
  btnOpenEditAvatar,
  profileAvatar,
  configValidation,
  configProfileInfo,
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupDeleteCard from "../scripts/components/PopupDeleteCard.js";

// Отображение информации о пользователе
const userInfo = new UserInfo(configProfileInfo);

// Попап с фото
const popupImage = new PopupWithImage('.popup_feat_show-image');

// Попап удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup_feat_delete', (card) => {
  card.removeCard();
  popupDeleteCard.close();
});

function createNewCard (element) {
  const card = new Card(element, popupImage.open, popupDeleteCard.open);
  return card.createCard();
}

// Отрисовка карточек
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    section.addItem(createNewCard(element));
  }
}, '.elements__items');

section.addCardsFromOriginalArray();

// Форма редактирования профиля
const popupProfile = new PopupWithForm('.popup_feat_edit-form', (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});

// Форма добавления карточек
const popupAddCard = new PopupWithForm('.popup_feat_add-cards', (element) => {
  section.addNewItem(createNewCard(element));
  popupAddCard.close();
});

// Форма редактирования профиля
const popupEditAvatar = new PopupWithForm('.popup_feat_edit-avatar', (data) => {
  profileAvatar.src = data.avatar;
  popupEditAvatar.close();
});


// Валидация форм
const formProfileValidator = new FormValidator(configValidation, formEditProfile);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(configValidation, formAddCard);
formAddValidator.enableValidation();

const formEditValidator = new FormValidator(configValidation, formEditAvatar);
formEditValidator.enableValidation();

// Навешивание слушателей
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

// Слушатели для открытия форм
btnOpenPopupProfile.addEventListener('click', () => {
  formProfileValidator.resetError();
  popupProfile.setInputValue(userInfo.getUserInfo());
  popupProfile.open();
});

btnOpenPopupCard.addEventListener('click', () => {
  formAddValidator.resetError();
  popupAddCard.open();
});

btnOpenEditAvatar.addEventListener('click', () => {
  formEditValidator.resetError();
  popupEditAvatar.open();
});