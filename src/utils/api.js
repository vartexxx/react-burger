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
