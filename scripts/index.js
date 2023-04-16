import { initialCards } from "./constants.js";

//Переменные для формы редактирования
const editProfileBtn = document.querySelector('.profile__intro-edit-btn');
const closePopupEditBtn = document.querySelector('.popup__close-btn_edit');
const popupEditForm = document.querySelector('.popup_edit-form');
const formElement = document.querySelector('.popup__input-container');
const nameProfile = document.querySelector('.profile__intro-name');
const nameInput = document.querySelector('.popup__input_type_name');
const jobProfile = document.querySelector('.profile__intro-job');
const jobInput = document.querySelector('.popup__input_type_job');
//Переменные для работы с карточками
const cardsTemplate = document.getElementById('elements-template');
const cardsContainer = document.querySelector('.elements__items');
const addCardsBtn = document.querySelector('.profile__add-btn');
const popupAddForm = document.querySelector('.popup_add-cards');
const closePopupAddBtn = document.querySelector('.popup__close-btn_add');
// const captionInput = document.querySelector('.popup__input_type_caption');
// const linkInput = document.querySelector('.popup__input_type_link');

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

//Добавление карточек
//Создаем элемент
const createCardElement = (cardData) => {
  //ищем и клонируем контент шаблона
  const cardElement = cardsTemplate.content.querySelector('.elements__element').cloneNode(true);

  const cardImage = cardElement.querySelector('.elements__photo');
  const cardTitle = cardElement.querySelector('.elements__place');
  const cardDeleteBtn = cardElement.querySelector('.elements__trash');
  const cardLikeBtn = cardElement.querySelector('.elements__like');

  //присваиваем контенту значения массива с сервера
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike = () => {
    cardLikeBtn.classList.toggle('elements__like_active');
  };

  cardDeleteBtn.addEventListener('click', handleDelete);
  cardLikeBtn.addEventListener('click', handleLike);

  return cardElement;
};

//Смотрим каждый элемнт массива и выводим на страницу
initialCards.forEach((card) => {
  const element = createCardElement(card);
  cardsContainer.prepend(element);
});

function openAddForm() {
  popupAddForm.classList.add('popup_opened');
}

function closeAddForm() {
  popupAddForm.classList.remove('popup_opened');
}


//Слушатели формы редактирования
editProfileBtn.addEventListener('click', openEditForm);
closePopupEditBtn.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', handleFormSubmit); 
//Слушатели добавления карточек
addCardsBtn.addEventListener('click', openAddForm);
closePopupAddBtn.addEventListener('click', closeAddForm);
