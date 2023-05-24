import { deleteCookie } from "../../utils/cookie";
import { logoutUser } from "../../utils/api";


export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';


const logoutUserAction = () => (dispatch) => {
    dispatch({type: LOGOUT_USER_REQUEST});
    logoutUser()
    .then((res) => {
        if(res && res.success) {
            deleteCookie('token');
            localStorage.removeItem('jwt');
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