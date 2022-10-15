class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  updateProfileData(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      credentials: 'include',
    }).then(this._checkResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(_id, isLiked) {
    return isLiked
      ? fetch(`${this._url}/cards/${_id}/likes`, {
          method: 'PUT',
          headers: this._headers,
          credentials: 'include',
        }).then(this._checkResponse)
      : fetch(`${this._url}/cards/${_id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
          credentials: 'include',
        }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://api.chirick.nomoredomains.icu/',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default api;
