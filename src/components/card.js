// функция создания карточки

export function createCard(card, cardFunc, method = 'append') {
  const placesList = document.querySelector('.places__list');
  const placeTemplate = document.querySelector('#card-template').content; // Берём содержимое шаблона
  const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true); //клонируем
  const cardImage = placeElement.querySelector('.card__image');
  cardImage.src = card.link; // Наполняем
  cardImage.alt = card.descr;
  placeElement.querySelector('.card__title').textContent = card.name;
  placeElement.querySelector('.card__delete-button').addEventListener('click', cardFunc.delete); //Обработчик из функции удаления
  placeElement.querySelector('.card__like-button').addEventListener('click', cardFunc.like);
  placeElement.querySelector('.card__image').addEventListener('click', cardFunc.popup);
  if (method === 'append') {
    placesList.append(placeElement); // По умолчанию добавит в конец
  }
  placesList.prepend(placeElement);
}

// функция удаления карточки

export function deletePlace(evt) {
  const deleteButton = evt.target;
  const place = deleteButton.closest('.places__item');
  place.remove();
}

// функция лайка в карточке

export function likeCard(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_is-active');
}