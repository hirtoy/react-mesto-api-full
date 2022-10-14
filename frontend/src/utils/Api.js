class mestoApi {
    constructor(params) {
        this._url = params.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    //загрузка данных профиля
    getProfile(token) {
        return fetch(
            `${this._url}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
              },
        }
        )
            .then(this._checkResponse);
    }

    // обновление данных пользоателя
    patchProfile(name, about) {
        return fetch(
            `${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
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
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                avatar: link
            })
        }
        )
            .then(res => this._checkResponse(res));
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
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
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
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
        })
            .then(res => this._checkResponse(res));
    }

    dislike(_id) {
        return fetch(`${this._url}/cards/likes/${_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
        })
            .then(res => this._checkResponse(res));
    }


    deleteCard(_id) {
        return fetch(
            `${this._url}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
              },
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

const Api = new mestoApi({
    baseUrl: "https://api.chirick.nomoredomains.icu",
    headers: {
        // authorization: "497373c8-3f58-4b67-8592-c177fbd661e3",
        "Content-Type": "application/json",
    },
});

export default Api;