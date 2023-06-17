import {
    registerUser
} from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types/types";
import { IUser } from "./getUserAction";


export const USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST' = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS' = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR: 'USER_REGISTER_ERROR' = 'USER_REGISTER_ERROR';

interface IUserRegisterRequest {
    readonly type: typeof USER_REGISTER_REQUEST,
};

interface IUserRegisterSuccess {
    readonly type: typeof USER_REGISTER_SUCCESS,
    user: IUser,
};

interface IUserRegisterError {
    readonly type: typeof USER_REGISTER_ERROR,
};

export type TUserRegisterAction =
    | IUserRegisterRequest
    | IUserRegisterSuccess
    | IUserRegisterError;

const userRegisterAction: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    })
    registerUser(name, email, password)
    .then((res) => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: 1200 });
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({type: USER_REGISTER_SUCCESS, user: res.user})
        }
        else {
            dispatch({
                type: USER_REGISTER_ERROR
            })
        }
    })
    .catch(() => {
        dispatch({
            type: USER_REGISTER_ERROR
        })
    })
}

export default userRegisterAction;
