import { setCookie } from "../../utils/cookie";
import { loginUser } from "../../utils/api";


export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';



const loginUserAction = (email, password) => (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });
    loginUser(email, password)
    .then(res => {
        if (res && res.success) {
            setCookie('token', res.accessToken, { expires: 1200 });
            localStorage.setItem("jwt", res.refreshToken);
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