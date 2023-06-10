import { forgotUserPassword } from "../../utils/api";
import { AppThunk, AppDispatch } from "../types/types";

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR' = 'FORGOT_PASSWORD_ERROR';

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
}

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export interface IForgotPasswordError {
    readonly type: typeof FORGOT_PASSWORD_ERROR
}

export type TForgotPasswordAction =
    | IForgotPasswordRequest
    | IForgotPasswordSuccess
    | IForgotPasswordError;


const forgotPasswordAction: AppThunk = (email: string) => (dispatch: AppDispatch) => {
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
