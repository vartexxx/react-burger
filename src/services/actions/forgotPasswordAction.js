import { forgotUserPassword } from "../../utils/api";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

const forgotPasswordAction = (email) => (dispatch) => {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    });
    forgotUserPassword(email)
    .then(res => {
        if (res && res.success) {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        }
        else {
            dispatch({ type: FORGOT_PASSWORD_ERROR })
        }
    })
    .catch(() => {
        dispatch({ type: FORGOT_PASSWORD_ERROR })
    })
}

export default forgotPasswordAction;