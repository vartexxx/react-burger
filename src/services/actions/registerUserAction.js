import {
    registerUser
} from "../../utils/api";
import { setCookie } from "../../utils/cookie";


export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';


const userRegisterAction = (name, email, password) => (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    })
    registerUser(name, email, password)
    .then((res) => {
        if (res && res.success) {
            setCookie('token', res.accessToken, { expires: 1200 });
            localStorage.setItem("jwt", res.refreshToken);
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
