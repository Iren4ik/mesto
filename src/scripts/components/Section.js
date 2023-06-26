export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    // this._initialCards = items;
    //функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
  }

  //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  renderCards(arrCards) {
    arrCards.forEach(element => {   
      this._renderer(element);
    })
  }

  // принимает DOM-элемент и добавляет его в контейнер.
  addItem(domElement) {
    this._container.append(domElement);
  }

  // принимает новый DOM-элемент и добавляет его в контейнер.
  addNewItem(domElement) {
    this._container.prepend(domElement);
  }
}