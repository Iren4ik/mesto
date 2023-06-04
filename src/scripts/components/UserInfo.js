export default class UserInfo {
  constructor(config) {
    this._profileName = document.querySelector(config.profileNameSelector); //'.profile__intro-name'
    this._profileJob = document.querySelector(config.profileJobSelector); //'.profile__intro-job'
  }

  //возвращает объект с данными пользователя, которые вставляются в форму при открытии попапа
  getUserInfo() {
    return {title: this._profileName.textContent, job: this._profileJob.textContent};
  }

  //принимает новые данные пользователя и добавляет их в профиль
  setUserInfo(configNewInfo) {
    this._profileName.textContent = configNewInfo.title;
    this._profileJob.textContent = configNewInfo.job;
  }
}