export default class Card {
  constructor(cardData, openPopupWithImage, openDeletePopup, handleCardLike) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._openPopupWithImage = openPopupWithImage;
    this._openDeletePopup = openDeletePopup;
    this._myId = cardData.myId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;  
    this._likes = cardData.likes;
    this._numberOfLikes = cardData.likes.length;
    this._handleCardLike = handleCardLike;
    
    this._templateElement = 
      document
      .getElementById('elements-template')
      .content
      .querySelector('.elements__element')
      .cloneNode(true);

    this._cardImage = this._templateElement.querySelector('.elements__photo');
    this._cardTitle = this._templateElement.querySelector('.elements__place');
    this._cardDeleteBtn = this._templateElement.querySelector('.elements__trash');
    this._cardLikeBtn = this._templateElement.querySelector('.elements__like');
    this._counter = this._templateElement.querySelector('.elements__like-counter');
  }

  _cardLike = () => {
    this._handleCardLike(this._cardLikeBtn, this._cardId);
  }

  _openDelete = () => {
    this._openDeletePopup({ card: this, cardId: this._cardId });
  }
  
  _openPicture = () => {
    this._openPopupWithImage(this._cardData);
  }

  _countLikes = () => {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._cardLikeBtn.classList.add('elements__like_active');
        return
      }
    });
    this._counter.textContent = this._numberOfLikes;
  }

  _setEventListener = () => {
    this._cardLikeBtn.addEventListener('click', this._cardLike);
    this._cardDeleteBtn.addEventListener('click', this._openDelete);
    this._cardImage.addEventListener('click', this._openPicture);
  }

  removeCard = () => {
    this._templateElement.remove();
    this._templateElement = null;
  }

  toggleLike = (dataLikes) => {
    this._cardLikeBtn.classList.toggle('elements__like_active');
    this._counter.textContent = dataLikes.length;
  }

  createCard = () => {
    this._cardImage.src = this._link;
    this._cardImage.alt = `На фотографии ${this._name}`;
    this._cardTitle.textContent = this._name;
    this._countLikes();
    
    if (this._myId !== this._ownerId) {
      this._cardDeleteBtn.remove();
    }
    
    this._setEventListener();
    return this._templateElement;
  }
}