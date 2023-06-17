import { resetUserPassword } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types/types";


export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST,
};

interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS,
}

interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED,
};

export type TResetPasswordAction =
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed;

const resetPasswordAction: AppThunk = (password, token) => (dispatch: AppDispatch) => {
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

export default resetPasswordAction;
