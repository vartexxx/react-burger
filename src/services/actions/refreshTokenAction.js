import { refreshUserToken } from "../../utils/api";
import { setCookie } from "../../utils/cookie";


export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

const refreshTokenAction = () => (dispatch) => {
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