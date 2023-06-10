import { setCookie } from "../../utils/cookie";
import { loginUser } from "../../utils/api";
import { AppThunk, AppDispatch } from "../types/types";
import { IUser } from "./getUserAction";

export const USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST' = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR: 'USER_LOGIN_ERROR' = 'USER_LOGIN_ERROR';

export interface IUserLoginRequest {
    readonly type: typeof USER_LOGIN_REQUEST
}

export interface IUserLoginSuccess {
    readonly type: typeof USER_LOGIN_SUCCESS,
    user: IUser
}

export interface IUserLoginError {
    readonly type: typeof USER_LOGIN_ERROR
}

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