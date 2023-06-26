import './index.css';

import {
  // initialCards,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  btnOpenPopupProfile,
  btnOpenPopupCard,
  btnOpenEditAvatar,
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
import Api from "../scripts/components/Api.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '9675f261-5028-4072-91c8-021126ec9131',
    'Content-Type': 'application/json'
  }
});

// Отображение информации о пользователе
const userInfo = new UserInfo(configProfileInfo);

// Попап с фото
const popupImage = new PopupWithImage('.popup_feat_show-image');

//Создание новой карточки
function createNewCard (element) {
  const card = new Card(element, popupImage.open, popupDeleteCard.open, (like, cardId) => {
    if (like.classList.contains('elements__like_active')) {
      api.deleteLike(cardId)
        .then(res => {card.toggleLike(res.likes)})
        .catch(err => console.log(`Что-то пошло не так: ${err}`));
    } else {
      api.putLike(cardId)
        .then(res => {card.toggleLike(res.likes)})
        .catch(err => console.log(`Что-то пошло не так: ${err}`));
    }
  });
  return card.createCard();
}

// Отрисовка карточек
const section = new Section((element) => {
  section.addItem(createNewCard(element));
}, '.elements__items');

// Попап удаления карточки
const popupDeleteCard = new PopupDeleteCard('.popup_feat_delete', ({ card, cardId }) => {
popupDeleteCard.renderLoading(true);
api.deleteCard(cardId)
  .then(() => {
    card.removeCard();
    popupDeleteCard.close();
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => popupDeleteCard.renderLoading(false));
});

//Попап редактирования профиля
const popupProfile = new PopupWithForm('.popup_feat_edit-form', (data) => {
popupProfile.renderLoading(true);
api.patchProfileInfo(data)
  .then(res => { 
    userInfo.setUserInfo({ 
      username: res.name, 
      job: res.about, 
      avatar: res.avatar });
    popupProfile.close();
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => popupProfile.renderLoading(false));
});

//Попап добавления карточек
const popupAddCard = new PopupWithForm('.popup_feat_add-cards', (data) => {
popupAddCard.renderLoading(true);
api.postNewCard(data)
  .then((res) => {
    res.myId = res.owner._id;
    section.addNewItem(createNewCard(res));
    popupAddCard.close();
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => popupAddCard.renderLoading(false));
});

//Попап редактирования аватара
const popupEditAvatar = new PopupWithForm('.popup_feat_edit-avatar', (data) => {
popupEditAvatar.renderLoading(true);
api.patchAvatar(data)
  .then(res => { 
    userInfo.setUserInfo({ 
      username: res.name, 
      job: res.about, 
      avatar: res.avatar });
    popupEditAvatar.close();
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => popupEditAvatar.renderLoading(false));
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

//принимаем на вход массив с промисами и выполняем код, только когда все промисы исполнены
Promise.all([api.getProfileInfo(), api.getInitialCards()])
.then(([resDataUser, resDataCard]) => {
  resDataCard.forEach(element => element.myId = resDataUser._id);
  
  userInfo.setUserInfo({ 
    username: resDataUser.name, 
    job: resDataUser.about, 
    avatar: resDataUser.avatar });
  
  section.renderCards(resDataCard);
})
.catch(err => console.log(`Что-то пошло не так: ${err}`));