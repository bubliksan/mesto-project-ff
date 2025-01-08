// Функция создания карточки

export function createCard(card, cardFunc, config) {
  const placeTemplate = document.querySelector('#card-template').content; // Берём содержимое шаблона
  const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true); //клонируем
  const cardImage = placeElement.querySelector('.card__image');
  const deleteCardButton = placeElement.querySelector('.card__delete-button');
  cardImage.src = card.link; // Наполняем
  cardImage.alt = card.name;
  placeElement.querySelector('.card__like-count').textContent = card.likes.length;
  placeElement.querySelector('.card__title').textContent = card.name;
  if(checkLike(card, config)) {
    placeElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  }
  if (card.owner._id === config.id) {
    deleteCardButton.classList.remove('card__delete-button-hidden');
    deleteCardButton.addEventListener('click', (evt) => cardFunc.delete(card._id, evt)); //Обработчик из функции удаления
  }
  placeElement.querySelector('.card__like-button').addEventListener('click', (evt) => cardFunc.like(card._id, evt));
  cardImage.addEventListener('click', cardFunc.popup);
  return(placeElement);
}

// Функция проверки своего лайка в карточке

function checkLike(card, config) {
  let result = false
  card.likes.forEach((item) => {
    if(item._id === config.id) {
      result = true;      
    }
  })
  return result;
}

// Функция лайка в карточке

export function likeCard(likesNumber, evt) {
  const likeButton = evt.target;
  likeButton.nextElementSibling.textContent = likesNumber;
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки

export function deletePlace(evt) {
  const deleteButton = evt.target;
  const place = deleteButton.closest('.places__item');
  place.remove();
}