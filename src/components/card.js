
// функция создания карточки

export function createCard(card, deleteFunc, likeFunc, popupFunc) {
    const placeTemplate = document.querySelector('#card-template').content; // Берём содержимое шаблона
    const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true); //клонируем
    const cardImage = placeElement.querySelector('.card__image');
    cardImage.src = card.link; // Наполняем
    cardImage.alt = card.descr;
    placeElement.querySelector('.card__title').textContent = card.name;
    placeElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc); //Обработчик из функции удаления
    placeElement.querySelector('.card__like-button').addEventListener('click', likeFunc);
    placeElement.querySelector('.card__image').addEventListener('click', popupFunc);
    return placeElement;
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

  // функция добавления новой карточки

export function addCard(evt) {
    const newCard = {};
    const popupAddItem = document.querySelector('.popup_type_new-card');
    const formAdd = document.forms['new-place'];
    const placeInput = formAdd.elements['place-name'];
    const urlInput = formAdd.elements.link;        
    evt.preventDefault();
    newCard.name = placeInput.value;
    newCard.link = urlInput.value;
    newCard.descr = placeInput.value;
    const element = createCard(newCard, deletePlace, likeCard, popupImage);
    placesList.prepend(element);
    popupAddItem.classList.remove('popup_is-opened');
    formAdd.removeEventListener('submit', addCard);
    formAdd.reset();
  }