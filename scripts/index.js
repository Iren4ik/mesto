import { initialCards } from "./constants.js";

//Переменные для формы редактирования
const editProfileBtn = document.querySelector('.profile__intro-edit-btn');
const closePopupEditBtn = document.querySelector('.popup__close-btn_type_edit');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const formElement = document.querySelector('.popup__input-container_type_edit');
const nameProfile = document.querySelector('.profile__intro-name');
const nameInput = document.querySelector('.popup__input_type_name');
const jobProfile = document.querySelector('.profile__intro-job');
const jobInput = document.querySelector('.popup__input_type_job');
//Переменные для работы с карточками
const cardsTemplate = document.getElementById('elements-template');
const cardsContainer = document.querySelector('.elements__items');
const addCardsBtn = document.querySelector('.profile__add-btn');
const popupAddForm = document.querySelector('.popup_type_add-cards');
const closePopupAddBtn = document.querySelector('.popup__close-btn_type_add');
const captionInput = document.querySelector('.popup__input_type_caption');
const linkInput = document.querySelector('.popup__input_type_link');
const addElement = document.querySelector('.popup__input-container_type_add');
//Переменные для открытия карточек
const popupPhoto = document.querySelector('.popup-photo');
const closePopupPhoto = document.querySelector('.popup-photo__close-btn');

//Форма редактирования
function openEditForm() {
  popupEditForm.classList.add('popup_opened');
  nameInput.value =  nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeEditForm() {
  popupEditForm.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditForm();
} 

//Карточки
const createCardElement = (cardData) => {
  const cardElement = cardsTemplate.content.querySelector('.elements__element').cloneNode(true);   //ищем и клонируем контент шаблона
  const cardImage = cardElement.querySelector('.elements__photo');
  const cardTitle = cardElement.querySelector('.elements__place');
  const cardDeleteBtn = cardElement.querySelector('.elements__trash');
  const cardLikeBtn = cardElement.querySelector('.elements__like');

  cardTitle.textContent = cardData.name;   //присваиваем контенту значения массива с сервера
  cardImage.src = cardData.link;

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    cardLikeBtn.classList.toggle('elements__like_active');
  };

  const openPhoto = () => {
    const photoSrc = document.querySelector('.popup-photo__photo');
    const photoTitle = document.querySelector('.popup-photo__caption');
  
    photoSrc.src = cardData.link;
    photoTitle.textContent = cardData.name;
    popupPhoto.classList.add('popup-photo_opened');
  }
  
  cardImage.addEventListener('click', openPhoto);
  cardDeleteBtn.addEventListener('click', handleDelete);
  cardLikeBtn.addEventListener('click', handleLike);

  return cardElement;
};

initialCards.forEach((card) => {   //Смотрим каждый элемнт массива и выводим на страницу
  const element = createCardElement(card);
  cardsContainer.prepend(element);
});

function openAddForm() {
  captionInput.value = '';
  linkInput.value = '';
  popupAddForm.classList.add('popup_opened');
}

function closeAddForm() {
  popupAddForm.classList.remove('popup_opened');
}

function handleAddCard(evt) {
  evt.preventDefault(); 
  let elementAdd = {
    name: captionInput.value,
    link: linkInput.value
  };
  const element = createCardElement(elementAdd);
  cardsContainer.prepend(element);
  closeAddForm();
}

function closePhoto() {
  popupPhoto.classList.remove('popup-photo_opened');
}

//Слушатели формы редактирования
editProfileBtn.addEventListener('click', openEditForm);
closePopupEditBtn.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', handleFormSubmit); 
//Слушатели карточек карточек
addCardsBtn.addEventListener('click', openAddForm);
closePopupAddBtn.addEventListener('click', closeAddForm);
addElement.addEventListener('submit', handleAddCard);
closePopupPhoto.addEventListener('click', closePhoto);

