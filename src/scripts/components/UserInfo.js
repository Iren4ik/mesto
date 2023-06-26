export default class UserInfo {
  constructor(config) {
    this._profileName = document.querySelector(config.profileNameSelector); //'.profile__intro-name'
    this._profileJob = document.querySelector(config.profileJobSelector); //'.profile__intro-job'
    this._profileAvatar = document.querySelector(config.profileAvatarSelector); //'.profile__avatar'
  }

  //возвращает объект с данными пользователя, которые вставляются в форму при открытии попапа
  getUserInfo() {
    return {username: this._profileName.textContent, job: this._profileJob.textContent};
  }

  //принимает новые данные пользователя и добавляет их в профиль
  setUserInfo({ username, job, avatar }) {
    this._profileName.textContent = username;
    this._profileJob.textContent = job;
    this._profileAvatar.src = avatar;
  }
}