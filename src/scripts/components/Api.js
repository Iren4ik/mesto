export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  //Проверка
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ой! Ошибка: ${res.status}`);
  }

  //Загрузка информации о пользователе с сервера
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {authorization: this._authorization}
    })
      .then(this._checkResponse);
  }

  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {authorization: this._authorization}
    })
      .then(this._checkResponse);
  } 

  //Редактирование профиля
  patchProfileInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataUser.username,
        about: dataUser.job,
      })
    })
      .then(this._checkResponse);
  }

  //Обновление аватара пользователя
  patchAvatar(dataUser) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataUser.avatar,
      })
    })
      .then(this._checkResponse);
  }

  //Добавление новой карточки
  postNewCard(dataCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link,
      })
    })
      .then(this._checkResponse);
  }

  // Постановка лайка
  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {authorization: this._authorization}
    })
      .then(this._checkResponse);
  }

  // Снятие лайка
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {authorization: this._authorization}
    })
    .then(this._checkResponse)
  }

  //Удаление карточки
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {authorization: this._authorization}
    })
      .then(this._checkResponse)
  }
}