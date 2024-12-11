// Функция закрытия попапа

export function hidePopup(itemPopup) {
  itemPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', pushButtonListener);
}
  
// Функция открытия попапа
  
export function showPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', pushButtonListener);
}

// Функция слушателя нажатия клавиши для попапа

export function pushButtonListener(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
   if (evt.key == 'Escape') {
      hidePopup(openedPopup);
  }
}