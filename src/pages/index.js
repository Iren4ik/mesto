import './index.css';
import {
  initialCards,
  btnOpenPopupProfile,
  formEditProfile,
  formAddCard,
  btnOpenPopupCard,
  configValidation,
  configProfileInfo,
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

// Отображение информации о пользователе
const userInfo = new UserInfo(configProfileInfo);

// Попап с фото
const popupImage = new PopupWithImage('.popup_feat_show-image');

// Отрисовка карточек
const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, popupImage.open);
    return card.createCard();
  }
}, '.elements__items');

section.addCardsFromOriginalArray();

// Форма редактирования профиля
const popupProfile = new PopupWithForm('.popup_feat_edit-form', (evt) => {
  evt.preventDefault();
  // принимаем данные пользователя из формы get и добавляем на страницу в профиле set
  userInfo.setUserInfo(popupProfile.getInputValue());
  popupProfile.close();
});

// Фора добавления карточек
const popupAddCard = new PopupWithForm('.popup_feat_add-cards', (evt) => {
  evt.preventDefault();
  section.addNewItem(section.renderer(popupAddCard.getInputValue()));
  popupAddCard.close();
});

// Валидация форм
const formProfileValidator = new FormValidator(configValidation, formEditProfile);
formProfileValidator.enableValidation();

const formAddValidator = new FormValidator(configValidation, formAddCard);
formAddValidator.enableValidation();

// Навешивание слушателей
popupImage.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

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