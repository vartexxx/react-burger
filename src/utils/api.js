import { getCookie } from "./cookie";
const url = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export function getApi() {
    return fetch(`${url}/ingredients`).then(checkResponse);
};

export function postApi(data) {
    return fetch(`${url}/orders`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            ingredients: data
        })
    })
    .then((res) => checkResponse(res))
};

export function registerUser(name, email, password) {
    return fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    })
    .then((res) => checkResponse(res))
}

export function loginUser(email, password) {
    return fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then((res) => checkResponse(res))
}

export function logoutUser(refreshToken) {
    return fetch(`${url}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: refreshToken,
        }),
    })
    .then((res) => checkResponse(res))
}

export function checkUserToken(accessToken) {
    return fetch(`${url}/auth/user`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    })
    .then((res) => checkResponse(res))
}

export function refreshUserToken(refreshToken) {
    return fetch(`${url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    })
    .then((res) => checkResponse(res))
}
  
export function forgotUserPassword(email) {
    return fetch(`${url}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    })
    .then((res) => checkResponse(res))
}

export function resetUserPassword(password, token) {
    return fetch(`${url}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, token}),
    })
    .then((res) => checkResponse(res))
}


export function changeUserData(data, accessToken) {
    return fetch(`${url}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    })
    .then((res) => checkResponse(res))
}

export function getUserRequest() {
    return fetch(`${url}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `${getCookie('token')}`
        }
    })
    .then((res) => checkResponse(res))
};