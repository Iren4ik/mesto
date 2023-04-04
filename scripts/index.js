let editProfileBtn = document.querySelector('.profile__intro-edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let editForm = document.querySelector('.popup');
let formElement = document.querySelector('.popup__input-container');
let nameProfile = document.querySelector('.profile__intro-name');
let nameInput = document.querySelector('.popup__input_type_name');
let jobProfile = document.querySelector('.profile__intro-job');
let jobInput = document.querySelector('.popup__input_type_job');

//Открытие формы

function openEditForm() {
  editForm.classList.add('popup_opened');
  nameInput.value =  nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

//Закрытие формы

function closeEditForm() {
  editForm.classList.remove('popup_opened');
}

//Сохранение новых данных

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditForm();
}

editProfileBtn.addEventListener('click', openEditForm);
closePopupBtn.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', handleFormSubmit); 
