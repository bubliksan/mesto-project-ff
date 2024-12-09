// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deletePlace ,likeCard } from './components/card.js';
import { hidePopup, showPopup, popupImage } from './components/modal.js';
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const cardFunctions = {delete: deletePlace, like: likeCard, popup: popupImage}

// функция добавления новой карточки

function addCard(evt) {
  const newCard = {};
  const placeInput = addForm.elements['place-name'];
  const urlInput = addForm.elements.link;        
  evt.preventDefault();
  newCard.name = placeInput.value;
  newCard.link = urlInput.value;
  newCard.descr = placeInput.value;
  createCard(newCard, cardFunctions, 'prepend');
  hidePopup(evt);
  addForm.reset();
}

// Запускаем всё

initialCards.forEach(function(item) {
  createCard(item, cardFunctions);  
});

// Слушаем клик на кнопке редактирования профиля

editProfileButton.addEventListener('click', function() {
  const editItemPopup = document.querySelector('.popup_type_edit');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescr = document.querySelector('.profile__description');  
  const nameInput = editForm.elements.name;
  const descrInput = editForm.elements.description;
  nameInput.value = profileTitle.textContent;
  descrInput.value = profileDescr.textContent;
  editForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescr.textContent = descrInput.value;
    hidePopup(evt);
  });
  showPopup(editItemPopup);
});

// Слушаем клик на кнопке добавления карточки
  
addCardButton.addEventListener('click', function() {
  const editItemAdd = document.querySelector('.popup_type_new-card');
  showPopup(editItemAdd);
  addForm.addEventListener('submit', addCard);
});