import { resetUserPassword } from "../../utils/api";


export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


const resetPasswrodAction = (password, token) => (dispatch) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST
    });
    resetUserPassword(password, token)
    .then(res => {
        if (res && res.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
        }
        else {
            dispatch({ type: RESET_PASSWORD_FAILED })
        }
    })
    .catch(() => {
        dispatch({ type: RESET_PASSWORD_FAILED })
    })
}

export default resetPasswrodAction;
