import { initialCards } from "./constants.js";
import { activateButton }  from "./validate.js";
import { deactivateButton }  from "./validate.js";
import { Card } from "./Card.js";

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
// const cardsTemplate = document.getElementById('elements-template');
const cardsContainer = document.querySelector('.elements__items');
const popupList = Array.from(document.querySelectorAll('.popup'));

const createNewCard = (element) => {
  const card = new Card (element, openPhoto);
  const cardElement = card.createCard();
  return cardElement;
}

//Открытие фото
const openPhoto = (cardData) => {
  photoElement.src = cardData.link;
  photoElement.alt = cardData.name;

  console.log(photoElement);
  console.log(photoElement.src);
  console.log(cardData.link);

  photoTitle.textContent = cardData.name;
  openPopup(showPicturePopup);
}

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('click', handlePopupClose);
  document.addEventListener('keydown', closePressTheEsc);
}



const openEditForm = () => {
  editProfileNameInput.value =  profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
  activateButton(editProfilePopup.querySelector('.popup__save-btn'), {inactiveButtonClass: 'popup__save-btn_disabled'});
  openPopup(editProfilePopup);
}

const openAddForm = () => {
  addCardsForm.reset();
  deactivateButton(addFormPopup.querySelector('.popup__save-btn'), {inactiveButtonClass: 'popup__save-btn_disabled'});
  openPopup(addFormPopup);
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('click', handlePopupClose);
  document.removeEventListener('keydown', closePressTheEsc);
}

const handlePopupClose = (evt) => {
  const isOverlay = evt.target.classList.contains('popup'); 
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');

  if (isOverlay || isCloseBtn) {
    popupList.forEach(closePopup);
  }
}; 

const closePressTheEsc = (evt) => {
  if (evt.key === 'Escape') {
    popupList.forEach(closePopup);
  }
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;
  closePopup(editProfilePopup);
}

const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); 
  const cardAdd = {
    name: addFormCaptionInput.value,
    link: addFormLinkInput.value
  };
  cardsContainer.prepend(createNewCard(cardAdd));
  closePopup(addFormPopup);
}

initialCards.forEach((element) => {   
  cardsContainer.append(createNewCard(element));
});

openEditProfileBtn.addEventListener('click', openEditForm);
openAddCardsBtn.addEventListener('click', openAddForm);
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
addCardsForm.addEventListener('submit', handleAddFormSubmit);