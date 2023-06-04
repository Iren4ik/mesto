const initialCards = [
  {
    title: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1668890115686-55c8625735e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1069&q=80'
  },
  {
    title: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634743098334-3b77179a5979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    title: 'Кижи',
    link: 'https://images.unsplash.com/photo-1615529597660-b4b888c7ff80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },
  {
    title: 'Сахалин',
    link: 'https://images.unsplash.com/photo-1671915651149-7e523e2ab04a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80'
  },
  {
    title: 'Судак',
    link: 'https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    title: 'Байкал',
    link: 'https://images.unsplash.com/photo-1622032493435-8bb0706ab31f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
]; 

const btnOpenPopupProfile = document.querySelector('.profile__intro-edit-btn');
const formEditProfile = document.forms['edit-form'];
const formAddCard = document.forms['add-form'];
const btnOpenPopupCard = document.querySelector('.profile__add-btn');

const configValidation = {
  formSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_valid_error',
  errorClass: 'popup__error_visible',
}

const configProfileInfo = {
  profileNameSelector: '.profile__intro-name',
  profileJobSelector: '.profile__intro-job'
}

export {
  initialCards,
  btnOpenPopupProfile,
  formEditProfile,
  formAddCard,
  btnOpenPopupCard,
  configValidation,
  configProfileInfo,
};