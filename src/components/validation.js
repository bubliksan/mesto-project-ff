// Выбираем все формы и для каждой вызываем утановку слушателя

export function enableValidation(validationOptions) {
    const formList = Array.from(document.querySelectorAll(validationOptions.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationOptions);
    });
}

// Очитска валидации и установка кнопки в неактивное состояние

export function clearValidation(formElement, validationOptions) {    
    const formElements = getFormElements(formElement, validationOptions);
    formElements[0].forEach((inputElement) => {
        hideInputError(inputElement, formElement, validationOptions);
    })
    formElements[1].disabled = true;
    formElements[1].classList.add(validationOptions.inactiveButtonClass);

}

// Функция возвращает массив с элементами формы

function getFormElements(formElement, validationOptions) {
    const inputList = Array.from(formElement.querySelectorAll(validationOptions.inputSelector));
    const buttonElement = formElement.querySelector(validationOptions.submitButtonSelector);
    return [inputList, buttonElement];
}

// Для каждого input в форме вешаем слушатель, отключаем кнопку

function setEventListeners(formElement, validationOptions) {
    const formElements = getFormElements(formElement, validationOptions);
    formElements[0].forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationOptions);
        toggleButtonState(formElements[0], formElements[1], validationOptions);
      });
    });
}

// Переключение состояния кнопки, в зависимости от валидации

function toggleButtonState(inputList, buttonElement, validationOptions) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationOptions.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationOptions.inactiveButtonClass);
    }
}

// Функция валидации элемента

function isValid(formElement, inputElement, validationOptions) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(inputElement, formElement, inputElement.validationMessage, validationOptions);
    } else {
        hideInputError(inputElement, formElement, validationOptions);
    }
}

// Отображение ошибки валидации и изменение внешнего вида

function showInputError(inputElement, formElement, errorMessage, validationOptions) {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
    inputElement.classList.add(validationOptions.inputErrorClass);
    errorElement.classList.add(validationOptions.errorClass);
    errorElement.textContent = errorMessage;    
}

// Скрытие ошибки валидации и отображение внешнего вида

function hideInputError(inputElement, formElement, validationOptions) {
    const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
    inputElement.classList.remove(validationOptions.inputErrorClass);
    errorElement.classList.remove(validationOptions.errorClass);
    errorElement.textContent = '';
}

// Проверка валидации полей для сосотояния кнопки

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}