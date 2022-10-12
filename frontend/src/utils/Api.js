class mestoApi {
    constructor(params) {
        this._url = params.baseUrl;
        this._headers = params.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    //загрузка данных профиля
    getProfile() {
        return fetch(
            `${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        }
        )
            .then(this._checkResponse);
    }

    // обновление данных пользоателя
    patchProfile(name, about) {
        return fetch(
            `${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }
        )
            .then(res => this._checkResponse(res));
    }

    // обновление фото пользоателя
    patchProfilePhoto(link) {
        return fetch(
            `${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }
        )
            .then(res => this._checkResponse(res));
    }


    //запрашиваем массив карточек с сервера
    getInitialCards() {
        return fetch(
            `${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        }
        )
            .then(res => this._checkResponse(res));
    }

    //создаём новую карточку
    createNewCard(name, link) {
        return fetch(
            `${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }
        )
            .then(res => this._checkResponse(res));
    }

    like(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }

    dislike(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkResponse(res));
    }


    deleteCard(_id) {
        return fetch(
            `${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers
        }
        )
            .then(res => this._checkResponse(res));
    }

    //обновляем статус карточки
    updateLikeStatus(_id, isLiked) {
        if (isLiked) {
            return this._addLike(_id);
        } else {
            return this._removeLike(_id);
        }
    }

    //установить лайк на карточку
    _addLike(_id) {
        return fetch(
            `${this._url}/cards/likes/${_id}`,
            {
                method: 'PUT',
                headers: this._headers
            }
        )
            .then(res => this._checkResponse(res));
    }

    //снять лайк с карточки
    _removeLike(_id) {
        return fetch(
            `${this._url}/cards/likes/${_id}`,
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
            .then(res => this._checkResponse(res));
    }
}

const Api = new mestoApi({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-44",
    headers: {
        authorization: '497373c8-3f58-4b67-8592-c177fbd661e3',
        'Content-Type': 'application/json'
    }
});

export default Api;