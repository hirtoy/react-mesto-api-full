export const BASE_URL = 'https://api.chirick.nomoredomains.icu';

const checkResponse = (res) =>
res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    .catch((err) => {
      console.log(err)
    })
};

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .catch((err) => console.log(err));
};

export function checkToken(token) {
    return fetch(
        `${BASE_URL}/users/me`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    .then((res) => res.json())

    .catch((err) => console.log(err));
}