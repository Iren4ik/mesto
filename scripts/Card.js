class Card {
  constructor(cardData, openPhoto) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._openPhoto = openPhoto;

    this._templateElement = 
      document
      .getElementById('elements-template')
      .content
      .querySelector('.elements__element')
      .cloneNode(true);
  }

  _handleLike = () => {
    this._cardLikeBtn.classList.toggle('elements__like_active');
  }

  _handleDelete = () => {
    this._templateElement.remove();
  }
  
  _openPicture = () => {
    this._openPhoto(this._cardData);
  }

  _setEventListener = () => {
    this._cardLikeBtn.addEventListener('click', this._handleLike);
    this._cardDeleteBtn.addEventListener('click', this._handleDelete);
    this._cardImage.addEventListener('click', this._openPicture);
  }

  createCard = () => {
    this._cardImage = this._templateElement.querySelector('.elements__photo');
    this._cardTitle = this._templateElement.querySelector('.elements__place');
    this._cardDeleteBtn = this._templateElement.querySelector('.elements__trash');
    this._cardLikeBtn = this._templateElement.querySelector('.elements__like');
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListener();
    return this._templateElement;
  }
}

export { Card };