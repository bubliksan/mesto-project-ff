// Функция закрытия попапа

export function hidePopup(evt) {
    console.log(evt);
  if ((evt.target.classList.contains('popup__form')) || (evt.target.classList.contains('popup__close')) || (evt.key === 'Escape')) {
    const popupList = document.querySelectorAll('.popup');
    popupList.forEach((item) => {
      item.classList.remove('popup_is-opened');    
    });
    evt.target.removeEventListener('click', hidePopup);
    document.removeEventListener('keydown', hidePopup);
  }
}
  
// Функция открытия попапа
  
export function showPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', hidePopup);
  document.addEventListener('keydown', hidePopup);
}

// функция открытия попапа с картинкой в карточке

export function popupImage(evt) {
  const cardPicture = document.querySelector('.popup_type_image');
  const cardName = evt.target.parentElement.innerText;  
  cardPicture.querySelector('.popup__image').src = evt.target.src;  // добавить ссылку на картинку
  cardPicture.querySelector('.popup__image').alt = evt.target.alt;  
  cardPicture.querySelector('.popup__caption').innerText = cardName;  // добавить текст подписи к картинке  
  cardPicture.classList.add('popup_is-opened');  // показать попап с картинкой и текстом
  cardPicture.addEventListener('click', hidePopup);
  document.addEventListener('keydown', hidePopup);
}