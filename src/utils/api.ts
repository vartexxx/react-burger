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

export async function getApi() {
    const res = await fetch(`${url}/ingredients`);
    return checkResponse(res);
};

export async function postApi(data: string[]) {
    const res = await fetch(`${url}/orders`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `${getCookie('accessToken')}`,
        },
        body: JSON.stringify({
            ingredients: data
        })
    });
    return await checkResponse(res);
};

export async function registerUser(name: string, email: string, password: string): Promise<TUserOptions> {
    const res = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });
    return await checkResponse(res);
}

export async function loginUser(email: string, password: string): Promise<TUserOptions> {
    const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return await checkResponse(res);
}

export async function logoutUser() {
    const res = await fetch(`${url}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    return await checkResponse(res);
}

export async function checkUserToken(accessToken: string) {
    const res = await fetch(`${url}/auth/user`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
    });
    return await checkResponse(res);
}

export async function refreshUserToken(): Promise<TRefreshAnswer> {
    const res = await fetch(`${url}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
    });
    return await checkResponse(res);
}
  
export async function forgotUserPassword(email: string) {
    const res = await fetch(`${url}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return await checkResponse(res);
}

export async function resetUserPassword(password: string, token: string) {
    const res = await fetch(`${url}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
    });
    return await checkResponse(res);
}


export async function changeUserData(data: object): Promise<TUserOptions> {
    const res = await fetchWithRefresh(`${url}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json",
            'authorization': `${getCookie('accessToken')}`,
        },
        body: JSON.stringify(data),
    });
    return await checkResponse(res);
}

export async function getUserRequest(): Promise<TUserOptions> {
    const res = await fetch(`${url}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `${getCookie('accessToken')}`
        }
    });
    return await checkResponse(res);
};
