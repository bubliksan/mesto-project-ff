// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу




// функция добавления карточки

function addPlace(placeData, deleteFunc) {
  const placesList = document.querySelector('.places__list');
  const placeTemplate = document.querySelector('#card-template').content; // Берём содержимое шаблона
  const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true); //клонируем
  // Наполняем
  placeElement.querySelector('.card__image').src = placeData[0];
  placeElement.querySelector('.card__image').alt = 'Картинка';
  placeElement.querySelector('.card__title').textContent = placeData[1];
  placeElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc) //Обработчик из функции удаления
  placesList.append(placeElement);
}

// функция удаления карточки

function deletePlace(evt) {
  const deleteButton = document.querySelector('.card__delete-button');
  const place = deleteButton.parentElement;
  place.remove();
}

//Запускаем всё

initialCards.forEach(function(item) {
  let placeMassive = [];
  placeMassive[0] = item.link;
  placeMassive[1] = item.name;
  addPlace(placeMassive, deletePlace);
})