// Функция закрытия попапа

export function hidePopup(evt) {
  const eventClasses = ['popup', 'popup__form', 'popup__close', 'Escape'];
  eventClasses.forEach(element => {
      if ((evt.target.classList.contains(element)) || (evt.key === element)) {
        const itemPopup = document.querySelector('.popup_is-opened');
        console.log(itemPopup);
        itemPopup.classList.remove('popup_is-opened');
        evt.target.removeEventListener('click', hidePopup);
        document.removeEventListener('keydown', hidePopup);
    };
  });
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