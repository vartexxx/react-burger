import { logoutUser } from "../../utils/api";
import { deleteCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types/types";

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR: 'LOGOUT_USER_ERROR' = 'LOGOUT_USER_ERROR';

interface IUserLogoutRequest {
    readonly type: typeof LOGOUT_USER_REQUEST,
};

interface IUserLogoutSuccess {
    readonly type: typeof LOGOUT_USER_SUCCESS,
};

interface IUserLogoutError {
    readonly type: typeof LOGOUT_USER_ERROR,
};

export type TUserLogoutAction =
    | IUserLogoutRequest
    | IUserLogoutSuccess
    | IUserLogoutError;

const logoutUserAction: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type: LOGOUT_USER_REQUEST});
    logoutUser()
    .then((res) => {
        if(res && res.success) {
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({type: LOGOUT_USER_SUCCESS})
        }
        else {
            dispatch({type: LOGOUT_USER_ERROR})
        }
    })
    .catch(() => {
        dispatch({type: LOGOUT_USER_ERROR})
    })
};

export default logoutUserAction;