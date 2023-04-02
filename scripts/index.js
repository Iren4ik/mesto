//Открытие и закрытие формы
let editProfileBtn = document.querySelector('.profile__intro-edit-btn');
let closePopupBtn = document.querySelector('.edit-form__close-btn');
let editForm = document.querySelector('.edit-form');

function openAndCloseEditForm() {
  editForm.classList.toggle('popup_open');
}

editProfileBtn.addEventListener('click', openAndCloseEditForm);
closePopupBtn.addEventListener('click', openAndCloseEditForm);

//Сохранение новых данных

let nameInput = document.querySelector('.edit-form__input-name');
let jobInput = document.querySelector('.edit-form__input-job');
let nameProfile = document.querySelector('.profile__intro-name');
let jobProfile = document.querySelector('.profile__intro-status');
let saveProfileBtn = document.querySelector('.edit-form__save-btn');

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  editForm.classList.remove('popup_open');
}

editForm.addEventListener('submit', handleFormSubmit); 
