import { getCookie } from "./cookie";


export type TUserOptions = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
      email: string,
      name: string,
    },
};

export type TRefreshAnswer = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
}


const url = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshUserToken();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken',refreshData.accessToken.split('Bearer ')[1]);
            (options.headers as { [key: string]: string }).Authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
}

export function getApi() {
    return fetch(`${url}/ingredients`).then(checkResponse);
};

export function postApi(data: string[]) {
    return fetch(`${url}/orders`, {
        method: 'POST',
        headers: { 
            'Content-type': 'application/json',
            'authorization': `${getCookie('accessToken')}`,
        },
        body: JSON.stringify({
            ingredients: data
        })
    })
    .then((res) => checkResponse(res))
};

export function registerUser(name: string, email: string, password: string): Promise<TUserOptions> {
    return fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password}),
    })
    .then((res) => checkResponse(res))
}

export function loginUser(email: string, password: string): Promise<TUserOptions> {
    return fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then((res) => checkResponse(res))
}

export function logoutUser() {
    return fetch(`${url}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    })
    .then((res) => checkResponse(res))
}

export function checkUserToken(accessToken: string) {
    return fetch(`${url}/auth/user`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    })
    .then((res) => checkResponse(res))
}

export function refreshUserToken(): Promise<TRefreshAnswer> {
    return fetch(`${url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    })
    .then((res) => checkResponse(res))
}
  
export function forgotUserPassword(email: string) {
    return fetch(`${url}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    })
    .then((res) => checkResponse(res))
}

export function resetUserPassword(password: string, token: string) {
    return fetch(`${url}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({password, token}),
    })
    .then((res) => checkResponse(res))
}


export function changeUserData(data: object): Promise<TUserOptions> {
    return fetchWithRefresh(`${url}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json",
            'authorization': `${getCookie('accessToken')}`,
        },
        body: JSON.stringify(data),
    })
    .then((res) => checkResponse(res))
}

export function getUserRequest(): Promise<TUserOptions> {
    return fetch(`${url}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `${getCookie('accessToken')}`
        }
    })
    .then((res) => checkResponse(res))
};
