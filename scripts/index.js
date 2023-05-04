import { initialCards } from "./constants.js";

// элементы секции profile:
const profileName = document.querySelector('.profile__intro-name');
const profileJob = document.querySelector('.profile__intro-job');
const openEditProfileBtn = document.querySelector('.profile__intro-edit-btn');
// элементы editProfilePopup:
const editProfilePopup = document.querySelector('.popup_feat_edit-form');
const editProfileForm = document.querySelector('.popup__input-container_type_edit');
const editProfileNameInput = document.querySelector('.popup__input_type_name');
const editProfileJobInput = document.querySelector('.popup__input_type_job');
const closeEditProfileBtn = editProfilePopup.querySelector('.popup__close-btn');
// элементы addCardPopup:
const addFormPopup = document.querySelector('.popup_feat_add-cards');
const addCardsForm = document.querySelector('.popup__input-container_type_add');
const addFormCaptionInput = document.querySelector('.popup__input_type_caption');
const addFormLinkInput = document.querySelector('.popup__input_type_link');
const openAddCardsBtn = document.querySelector('.profile__add-btn');
const closeAddFormBtn = addFormPopup.querySelector('.popup__close-btn');
// элементы showPicturePopup:
const showPicturePopup = document.querySelector('.popup_feat_show-image');
const closeShowPictureBtn = showPicturePopup.querySelector('.popup__close-btn');
// другие элементы:
const cardsTemplate = document.getElementById('elements-template');
const cardsContainer = document.querySelector('.elements__items');

const closeClickToOverlay = (evt) => {
  const isOverlay = evt.target.classList.contains('popup'); 
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');
  const popupList = Array.from(document.querySelectorAll('.popup'));

  if (isOverlay || isCloseBtn) {
    popupList.forEach((popupElement) => {
      closePopup(popupElement);
    });
  }
}; 

const openPopup = (popupElement) => {
  popupElement.classList.add('popup_opened');
}

const closePopup = (popupElement) => {
  popupElement.classList.remove('popup_opened');
}

const openEditForm = () => {
  editProfileNameInput.value =  profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
}

const openAddForm = () => {
  addFormCaptionInput.value = '';
  addFormLinkInput.value = '';
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

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    cardLikeBtn.classList.toggle('elements__like_active');
  };

  const openPhoto = () => {
    const photoSrc = document.querySelector('.popup__photo');
    const photoTitle = document.querySelector('.popup__caption');
    photoSrc.src = cardData.link;
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
closeEditProfileBtn.addEventListener('click', () => closePopup(editProfilePopup));
closeAddFormBtn.addEventListener('click', () => closePopup(addFormPopup)); 
closeShowPictureBtn.addEventListener('click', () => closePopup(showPicturePopup));
editProfileForm.addEventListener('submit', handleProfileFormSubmit); 
addCardsForm.addEventListener('submit', handleAddFormSubmit);
document.addEventListener('click', (evt) => closeClickToOverlay(evt));

