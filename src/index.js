// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './index.css';
import { initialCards } from './scripts/cards.js';

// функция создания карточки

function createCard(card, deleteFunc) {
  const placeTemplate = document.querySelector('#card-template').content; // Берём содержимое шаблона
  const placeElement = placeTemplate.querySelector('.places__item').cloneNode(true); //клонируем
  const cardImage = placeElement.querySelector('.card__image');
  cardImage.src = card.link; // Наполняем
  cardImage.alt = card.descr;
  placeElement.querySelector('.card__title').textContent = card.name;
  placeElement.querySelector('.card__delete-button').addEventListener('click', deleteFunc) //Обработчик из функции удаления
  return placeElement;
}

// функция удаления карточки

function deletePlace(evt) {
  const deleteButton = evt.target;
  const place = deleteButton.closest('.places__item');
  place.remove();
}

//Запускаем всё

initialCards.forEach(function(item) {
  const placesList = document.querySelector('.places__list');
  const element = createCard(item, deletePlace);
  placesList.append(element);
})