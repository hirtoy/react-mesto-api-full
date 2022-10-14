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
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        return data.token;
      }
    })
    .catch((err) => console.log(err));
};

export function checkToken(token) {
    return fetch(
        `${BASE_URL}/users/me`, 
        {
            method: 'GET',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        }
    )
    .then(checkResponse)
};