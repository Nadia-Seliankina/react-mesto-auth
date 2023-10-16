class Api {
    // Универсальный, должен работать с любым API
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData));
    }

    // Инфо о пользователе с сервера
    getInfoUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this.#onResponse)
    }
    
    // Начальные карточки с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    getAllInfo() {
        return Promise.all([this.getInfoUser(), this.getInitialCards()])
    }

    // Редактирование профиля
    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this.#onResponse)
    }

    // Обновление аватара пользователя
    editAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this.#onResponse)
    }

    // Удаление карточки
    removeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this.#onResponse)
    }

    // Добавление карточки
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this.#onResponse)
    }

    // Лайкнуть карточку
    changeLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
        .then(this.#onResponse)
    }
}

const configApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
      "content-type": "application/json",
      authorization: '0523e71c-6164-4ff4-82c6-ca81e8bb5b70'
    }
}

const api = new Api(configApi);

export default api;