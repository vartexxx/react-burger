import { refreshUserToken } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { AppDispatch, AppThunk } from "../types/types";


export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

interface IRefreshTokenRequest {
    readonly type: typeof REFRESH_TOKEN_REQUEST,
};

interface IRefreshTokenSuccess {
    readonly type: typeof REFRESH_TOKEN_SUCCESS,
};

interface IRefreshTokenFailed {
    readonly type: typeof REFRESH_TOKEN_FAILED,
};

export type TRefreshTokenAction =
    | IRefreshTokenRequest
    | IRefreshTokenSuccess
    | IRefreshTokenFailed;

const refreshTokenAction: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({ type: REFRESH_TOKEN_REQUEST });
    refreshUserToken()
    .then(res => {
        if (res && res.success) {
            setCookie('accessToken', res.accessToken, { expires: 1200 });
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({ type: REFRESH_TOKEN_SUCCESS })
        }
        else {
            dispatch({ type: REFRESH_TOKEN_FAILED })
        }
    })
    .catch(() => {
        dispatch({ type: REFRESH_TOKEN_FAILED })
    })
}

export default refreshTokenAction;
