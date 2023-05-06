import { initialCards } from "./constants.js";
import { activateButton }  from "./validate.js";
import { deactivateButton }  from "./validate.js";

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
const cardsTemplate = document.getElementById('elements-template');
const cardsContainer = document.querySelector('.elements__items');
const popupList = Array.from(document.querySelectorAll('.popup'));


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

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('click', handlePopupClose);
  document.addEventListener('keydown', closePressTheEsc);
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('click', handlePopupClose);
  document.removeEventListener('keydown', closePressTheEsc);
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

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = editProfileNameInput.value;
  profileJob.textContent = editProfileJobInput.value;
  closePopup(editProfilePopup);
} 

const handleAddFormSubmit = (evt) => {
  evt.preventDefault(); 
  const elementAdd = {
    name: addFormCaptionInput.value,
    link: addFormLinkInput.value
  };
  const element = createCardElement(elementAdd);
  cardsContainer.prepend(element);
  closePopup(addFormPopup);
}

const createCardElement = (cardData) => {
  const cardElement = cardsTemplate.content.querySelector('.elements__element').cloneNode(true);   //ищем и клонируем контент шаблона
  const cardImage = cardElement.querySelector('.elements__photo');
  const cardTitle = cardElement.querySelector('.elements__place');
  const cardDeleteBtn = cardElement.querySelector('.elements__trash');
  const cardLikeBtn = cardElement.querySelector('.elements__like');
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    cardLikeBtn.classList.toggle('elements__like_active');
  };

  const openPhoto = () => {
    photoElement.src = cardData.link;
    photoElement.alt = cardData.name;
    photoTitle.textContent = cardData.name;
    openPopup(showPicturePopup);
  }
  
  cardImage.addEventListener('click', openPhoto);
  cardDeleteBtn.addEventListener('click', handleDelete);
  cardLikeBtn.addEventListener('click', handleLike);
  return cardElement;
};

initialCards.forEach((card) => {   //Смотрим каждый элемнт массива и выводим на страницу
  const element = createCardElement(card);
  cardsContainer.append(element);
});

openEditProfileBtn.addEventListener('click', openEditForm);
openAddCardsBtn.addEventListener('click', openAddForm);
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
addCardsForm.addEventListener('submit', handleAddFormSubmit);

