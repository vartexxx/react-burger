import { loginUser } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types/types";
import { IUser } from "./getUserAction";


export const USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST' = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR: 'USER_LOGIN_ERROR' = 'USER_LOGIN_ERROR';

interface IUserLoginRequest {
    readonly type: typeof USER_LOGIN_REQUEST,
};

interface IUserLoginSuccess {
    readonly type: typeof USER_LOGIN_SUCCESS,
    user: IUser,
};

interface IUserLoginError {
    readonly type: typeof USER_LOGIN_ERROR,
};

export type TUserLoginAction =
    | IUserLoginRequest
    | IUserLoginSuccess
    | IUserLoginError;

const loginUserAction: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });
    loginUser(email, password)
    .then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: 1200 });
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({ type: USER_LOGIN_SUCCESS, user: res.user })
        }
        else {
            dispatch({ type: USER_LOGIN_ERROR })
        }
    })
    .catch(() => {
        dispatch({ type: USER_LOGIN_ERROR })
    })
}

export default loginUserAction;