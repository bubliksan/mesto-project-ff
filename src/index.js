// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './index.css';
import { apiConfig } from './scripts/api_config.js';
import { validationOptions } from './scripts/validation_options.js';
import { createCard, likeCard, deletePlace } from './components/card.js';
import { hidePopup, showPopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfile,
  editProfile,
  getCards,
  sendCard,
  deleteCard,
  sendLike,
  removeLike,
  editAvatar } from './components/api.js';
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const editItemPopup = document.querySelector('.popup_type_edit');
const editAvatarPopup = document.querySelector('.popup_type_new-avatar');
const editItemAdd = document.querySelector('.popup_type_new-card');
const deleteItemPopup = document.querySelector('.popup_type_delete-card');
const cardImagePopup = document.querySelector('.popup_type_image');
let modifiedCardId = null;
let modifiedCardTargetButton = null;
const cardImage = cardImagePopup.querySelector('.popup__image');
const cardCaption = cardImagePopup.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const allPopups = document.querySelectorAll('.popup');
const addForm = document.forms['new-place'];
const editForm = document.forms['edit-profile'];
const deleteForm = document.forms['delete-card'];
const changeAvatarForm = document.forms['new-avatar'];
const nameInput = editForm.elements.name;
const descrInput = editForm.elements.description;
const cardFunctions = {delete: handleDeletePlace, like: handleLikePlace, popup: handleImageClick}

// Функция добавления новой карточки

function addCard(evt) {
  const newCard = {};
  const placeInput = addForm.elements['place-name'];
  const urlInput = addForm.elements.link;        
  evt.preventDefault();
  addForm.elements['submit-button'].textContent = 'Сохранение...';
  newCard.name = placeInput.value;
  newCard.link = urlInput.value;
  newCard.descr = placeInput.value;
  newCard.owner = {_id: apiConfig.id}; // для определения владельца карточки
  sendCard(newCard, apiConfig).then((data) => {
    renderCard(data, 'prepend');
    hidePopup(editItemAdd);
  })
  addForm.reset();
}

// Обработчик удаления карточки

function handleDeletePlace(id, evt) {
  modifiedCardTargetButton = evt;
  modifiedCardId = id;
  showPopup(deleteItemPopup);
}

// обработчик лайка в карточке

function handleLikePlace(id, evt) {
  modifiedCardId = id;
  modifiedCardTargetButton = evt;
  if (evt.target.classList.contains('card__like-button_is-active')) {
    removeLike(modifiedCardId, apiConfig).then((data) => {
      likeCard(data.likes.length, modifiedCardTargetButton);
      evt.target.classList.remove('card__like-button_is-active');
    })
  } else {
    sendLike(modifiedCardId, apiConfig).then((data) => {
        likeCard(data.likes.length , modifiedCardTargetButton);
    })
  }
}

// Функция отрисовки карточек

function renderCard(item, method='append') {
  const cardElement = createCard(item, cardFunctions, apiConfig);
  placesList[method](cardElement);
}

// функция открытия попапа с картинкой в карточке

function handleImageClick(evt) {
  const currentCard = evt.target.closest('.places__item');
  const cardName = currentCard.querySelector('.card__description');
  cardImage.src = evt.target.src;  // добавить ссылку на картинку
  cardImage.alt = evt.target.alt;  
  cardCaption.innerText = cardName.innerText;  // добавить текст подписи к картинке
  showPopup(cardImagePopup);  // показать попап с картинкой и текстом
}

// Запускаем всё

Promise.all([
  getProfile(apiConfig),
  getCards(apiConfig)
])
.then(([getProfileData, getCardsData]) => {
  profileTitle.textContent = getProfileData.name;
  profileDescr.textContent = getProfileData.about;
  profileImage.setAttribute('style', `background-image: url(${getProfileData.avatar})`);
  apiConfig.id = getProfileData._id; // сохраняем id себя, как пользователя
  getCardsData.forEach((item) => {
    renderCard(item);
  });
})

// Запускаем валидацию форм

enableValidation(validationOptions);

// Вешаем обработчик кликов закрытия на формы (вариант)

allPopups.forEach(function(item) {
  item.addEventListener('click', function(evt) {
    if ((evt.target.classList.contains('popup__close')) || ((evt.target.classList.contains('popup')))) {
      hidePopup(item);
    }
  });
})

// Слушаем submit в форме редактирования профиля

editForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  editForm.elements['submit-button'].textContent = 'Сохранение...';
  editProfile(nameInput, descrInput, apiConfig).then((data) => {
    profileTitle.textContent = data.name;
    profileDescr.textContent = data.about;
    hidePopup(editItemPopup);
  })
  
});

// Слушаем submit в форме добавления карточки

addForm.addEventListener('submit', addCard);

// Слушаем submit в форме удаления карточки

deleteForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  deleteCard(modifiedCardId, apiConfig).then(() => {
    deletePlace(modifiedCardTargetButton);
    hidePopup(deleteItemPopup);
  }) 
})

// Слушаем submit в форме редактирования аватара

changeAvatarForm.addEventListener('submit', function(evt) {
  const urlInput = changeAvatarForm.elements.link.value;
  evt.preventDefault();
  changeAvatarForm.elements['submit-button'].textContent = 'Сохранение...';
  editAvatar(urlInput, apiConfig).then(() => {
    profileImage.setAttribute('style', `background-image: url(${urlInput})`);
    hidePopup(editAvatarPopup);
  })  
})

// Слушаем клик на картинке профиля

profileImage.addEventListener('click', (evt) => {
  changeAvatarForm.reset();
  showPopup(editAvatarPopup); 
})

// Слушаем клик на кнопке редактирования профиля

editProfileButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent;
  descrInput.value = profileDescr.textContent;
  clearValidation(editForm, validationOptions);
  showPopup(editItemPopup);
});

// Слушаем клик на кнопке добавления карточки
  
addCardButton.addEventListener('click', function() {
  clearValidation(addForm, validationOptions);
  addForm.reset();
  showPopup(editItemAdd);
});