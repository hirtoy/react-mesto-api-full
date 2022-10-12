export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) =>
res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then(checkResponse)
};

export function checkToken(token) {
    return fetch(
        `${BASE_URL}/users/me`, 
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    .then(checkResponse)
}