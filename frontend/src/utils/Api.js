class mestoApi {
    constructor(options) {
        this._url = options.baseURL;
        this._headers = options.headers;
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
            headers: { ...this._headers, authorization: getToken() },
            credentials: 'include',
        }).then(this._checkResponse);
    }

    // обновление данных пользоателя
    patchProfile(name, about) {
        return fetch(
            `${this._url}/users/me`, {
            headers: { ...this._headers, authorization: getToken() },
            credentials: 'include',
        }).then(this._checkResponse);
    }
    // обновление фото пользоателя
    patchProfilePhoto(link) {
        return fetch(
            `${this._url}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { ...this._headers, authorization: getToken() },
            body: JSON.stringify({ link: link }),
        }).then(this._checkResponse);
    }


    //запрашиваем массив карточек с сервера
    getInitialCards(token) {
        return fetch(
            `${this._url}/cards`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            },
        }
        )
            .then(res => this._checkResponse(res));
    }

    //создаём новую карточку
    createNewCard(name, link) {
        return fetch(
            `${this._url}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: { ...this._headers, authorization: getToken() },
            body: JSON.stringify({ name: name, link: link }),
        }).then(this._checkResponse);
    }

    like(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { ...this._headers, authorization: getToken() },
        })
            .then(this._checkResponse);
    }

    dislike(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { ...this._headers, authorization: getToken() },
        })
            .then(this._checkResponse);
    }


    deleteCard(_id) {
        return fetch(
            `${this._url}/cards/${_id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { ...this._headers, authorization: getToken() },
        }).then(this._checkResponse);
    }

    //обновляем статус карточки
    updateLikeStatus(_id, isLiked) {
        if (isLiked) {
            return this._addLike(_id);
        } else {
            return this._removeLike(_id);
        }
    }


    //     //установить лайк на карточку
    //     _addLike(_id) {
    //         return fetch(
    //             `${this._url}/cards/likes/${_id}`,
    //             {
    //                 method: 'PUT',
    //                 headers: this._headers,
    //             }
    //         )
    //             .then(res => this._checkResponse(res));
    //     }

    //     //снять лайк с карточки
    //     _removeLike(_id) {
    //         return fetch(
    //             `${this._url}/cards/likes/${_id}`,
    //             {
    //                 method: 'DELETE',
    //                 headers: this._headers,
    //             }
    //         )
    //             .then(res => this._checkResponse(res));
    //     }
}
const getToken = () => {
    return `Bearer ${localStorage.getItem('jwt')}`;
}

const Api = new mestoApi({
    baseUrl: "https://api.chirick.nomoredomains.icu",
    headers: {
        // authorization: "497373c8-3f58-4b67-8592-c177fbd661e3",
        "Content-Type": "application/json",
    },
});

export default Api;