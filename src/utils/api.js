const url = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = res => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export default function getApi() {
    return fetch(`${url}`).then(checkResponse);
};