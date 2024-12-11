// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deletePlace ,likeCard } from './components/card.js';
import { hidePopup, showPopup, pushButtonListener } from './components/modal.js';
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const editItemPopup = document.querySelector('.popup_type_edit');
const editItemAdd = document.querySelector('.popup_type_new-card');
const cardImagePopup = document.querySelector('.popup_type_image');
const cardImage = cardImagePopup.querySelector('.popup__image');
const cardCaption = cardImagePopup.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const formsAll = document.querySelectorAll('.popup'); 
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const descrInput = editForm.elements.description;
const cardFunctions = {delete: deletePlace, like: likeCard, popup: showImagePopup}

// Функция добавления новой карточки

function addCard(evt) {
  const newCard = {};
  const placeInput = addForm.elements['place-name'];
  const urlInput = addForm.elements.link;        
  evt.preventDefault();
  newCard.name = placeInput.value;
  newCard.link = urlInput.value;
  newCard.descr = placeInput.value;
  renderCard(newCard, 'prepend');
  hidePopup(editItemAdd);
  addForm.reset();
}

// Функция отрисовки карточек

function renderCard(item, method='append') {
  const cardElement = createCard(item, cardFunctions);
  placesList[method](cardElement);
}

// функция открытия попапа с картинкой в карточке

function showImagePopup(evt) {
  const currentCard = evt.target.closest('.places__item');
  const cardName = currentCard.querySelector('.card__description');
  cardImage.src = evt.target.src;  // добавить ссылку на картинку
  cardImage.alt = evt.target.alt;  
  cardCaption.innerText = cardName.innerText;  // добавить текст подписи к картинке
  showPopup(cardImagePopup);  // показать попап с картинкой и текстом
  document.addEventListener('keydown', pushButtonListener);
}

// Запускаем всё

initialCards.forEach(function(item) {
  renderCard(item);  
});

// Вешаем обработчик кликов закрытия на формы (вариант)

formsAll.forEach(function(item) {
  item.addEventListener('click', function(evt) {
    if ((evt.target.classList.contains('popup__close')) || ((evt.target.classList.contains('popup')))) {
      hidePopup(item);
    }
  });
})

// Слушаем submit в форме редактирования профиля

editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescr.textContent = descrInput.value;
  hidePopup(editItemPopup);
});

// Слушаем submit в форме добавления карточки

addForm.addEventListener('submit', addCard);

// Слушаем клик на кнопке редактирования профиля

editProfileButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  descrInput.value = profileDescr.textContent;
  showPopup(editItemPopup);
});

// Слушаем клик на кнопке добавления карточки
  
addCardButton.addEventListener('click', function() {;
  showPopup(editItemAdd);
});