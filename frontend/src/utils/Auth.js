export const BASE_URL = 'https://api.chirick.nomoredomains.icu';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('Bad response from server');
      }
      if (res.status === 409) {
        throw new Error('Такой пользователь уже существует');
      }
      return res.json();
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
};

export const autorise = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer' + token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => data);
};
