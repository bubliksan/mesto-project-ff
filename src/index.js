// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deletePlace ,likeCard, addCard } from './components/card.js';
const content = document.querySelector('.content');
export const placesList = document.querySelector('.places__list');
export const newCard = {};


// Функция закрытия попапа

function popupHide(evt) {
  if ((evt.target.classList.contains('popup')) || (evt.target.classList.contains('popup__close')) || (evt.key === 'Escape')) {
    const popupList = document.querySelectorAll('.popup');
    popupList.forEach((item) => {
      item.classList.remove('popup_is-opened');    
    })
    evt.target.removeEventListener('click', popupHide);
    document.removeEventListener('keydown', popupHide);
  }
}

// Функция открытия попапа

function popupShow(popup) {
  if (popup.classList.contains('popup_type_edit')) {
    const profileTitle = document.querySelector('.profile__title');
    const profileDescr = document.querySelector('.profile__description');
    const formEdit = document.forms['edit-profile'];
    const nameInput = formEdit.elements.name;
    const descrInput = formEdit.elements.description;
    nameInput.value = profileTitle.textContent;
    descrInput.value = profileDescr.textContent;
    formEdit.addEventListener('submit', function(evt) {
      evt.preventDefault();
      profileTitle.textContent = nameInput.value;
      profileDescr.textContent = descrInput.value;
      popup.classList.remove('popup_is-opened');
    })
  } else if (popup.classList.contains('popup_type_new-card')) {
    const formAdd = document.forms['new-place'];
    formAdd.addEventListener('submit', addCard);
  }
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', popupHide);
  document.addEventListener('keydown', popupHide);
}

  // функция открытия попапа с картинкой в карточке

  export function popupImage(evt) {
    const cardPicture = document.querySelector('.popup_type_image');
    const cardName = evt.target.parentElement.innerText;  
    cardPicture.querySelector('.popup__image').src = evt.target.src;  // добавить ссылку на картинку
    cardPicture.querySelector('.popup__caption').alt = evt.target.alt;  
    cardPicture.querySelector('.popup__caption').innerText = cardName;  // добавить текст подписи к картинке  
    cardPicture.classList.add('popup_is-opened');  // показать попап с картинкой и текстом
    cardPicture.addEventListener('click', popupHide);
    document.addEventListener('keydown', popupHide);
  }

//Запускаем всё

initialCards.forEach(function(item) {
  const element = createCard(item, deletePlace, likeCard, popupImage);
  placesList.append(element);
})

content.addEventListener('click', function(evt) {
  const popupEditItem = document.querySelector('.popup_type_edit');
  const popupAddItem = document.querySelector('.popup_type_new-card');
  const aim = evt.target;
  switch (aim.className) {
    case 'profile__edit-button':
      popupShow(popupEditItem);
      break;
    case 'profile__add-button':
      popupShow(popupAddItem);
    }
});