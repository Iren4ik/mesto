//Открытие и закрытие формы
let editProfileBtn = document.querySelector('.profile__intro-edit-btn');
let closePopupBtn = document.querySelector('.popup__close-btn');
let editForm = document.querySelector('.popup');

function openAndCloseEditForm() {
  editForm.classList.toggle('popup_opened');
}

editProfileBtn.addEventListener('click', openAndCloseEditForm);
closePopupBtn.addEventListener('click', openAndCloseEditForm);

//Сохранение новых данных

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let nameProfile = document.querySelector('.profile__intro-name');
let jobProfile = document.querySelector('.profile__intro-job');
let saveProfileBtn = document.querySelector('.popup__save-btn');

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  editForm.classList.remove('popup_opened');
}

editForm.addEventListener('submit', handleFormSubmit); 
