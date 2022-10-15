export const BASE_URL = 'https://api.chirick.nomoredomains.icu';

// const checkResponse = (res) =>
//     res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response => response.json()))
        .catch(err => console.log(err))
};


export function checkToken(token) {
    return fetch(
        `${BASE_URL}/users/me`,
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        }
    )
        .then((res) => {
            if (res.status === 401) {
                throw new Error('Invalid token');
            }
            return res.json()
        })
        .then((data) => data);
};