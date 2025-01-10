const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
   return Promise.reject(`Ошибка!: ${res.status}`); 
}

// Запрос к серверу на загрузку данных профиля

export function getProfile(config) {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(handleResponse)
}

// Запрос к серверу на обновление данных профиля 

export function editProfile(namePr, descriptionPr, config) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${namePr.value}`,
            about: `${descriptionPr.value}`
        })
    })
    .then(handleResponse)
}

// Запрос к серверу на загрузку карточек

export function getCards(config) {
    return fetch(`${config.baseUrl}/cards`, {
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then(handleResponse)
}

// Запрос к серверу на добавление карточки

export function sendCard(newCard, config) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: `${newCard.name}`,
            link: `${newCard.link}`
        })
    })
    .then(handleResponse)
}

// Запрос к серверу на удаление карточки

export function deleteCard(cardId, config) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',        
        headers: config.headers,
    })
    .then(handleResponse)
}

// Запрос к серверу на установку лайка

export function sendLike(cardId, config) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',        
        headers: config.headers,
    })
    .then(handleResponse)
}

// Запрос к серверу на снятие лайка

export function removeLike(cardId, config) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',        
        headers: config.headers,
    })
    .then(handleResponse)
}

// Запрос к серверу на изменение аватара

export function editAvatar(link, config) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${link}`
        })
    })
    .then(handleResponse)
}