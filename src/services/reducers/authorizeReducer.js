import { FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../actions/forgotPasswordAction";
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS } from "../actions/getUserAction";
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../actions/loginUserAction";
import { LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS } from "../actions/logoutUserAction";
import { USER_REGISTER_ERROR, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../actions/registerUserAction";
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../actions/resetPasswordAction";
import { UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../actions/updateUserAction";


const initialState = {
    user: { name: '', email: '', },
    isAuthorization: false,

    registerRequest: false,
    registerFailed: false,

    loginRequest: false,
    loginFailed: false,

    logoutUserRequest: false,
    logoutUserFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordCodeSend: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,

    getUserRequest: false,
    getUserFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,
};


const authorizeReducer = ( state = initialState, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST: {
            return {
                ...state, registerRequest: true, registerFailed: false
            }
        }
        case USER_REGISTER_SUCCESS: {
            return {
                ...state,
                isAuthorization: true,
                user: action.user,
                registerRequest: false,
                registerFailed: false
            }
        }
        case USER_REGISTER_ERROR: {
            return {
                ...state, registerRequest: false, registerFailed: true
            }
        }
        case USER_LOGIN_REQUEST: {
            return {
                ...state, loginRequest: true, loginFailed: false
            }
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isAuthorization: true,
                user: action.user,
                loginRequest: false,
                loginFailed: false
            }
        }
        case USER_LOGIN_ERROR: {
            return {
                ...state, loginRequest: false, loginFailed: true
            }
        }
        case LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logoutUserRequest: true,
                logoutUserFailed: false,
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                isAuthorization: false,
                logoutUserRequest: false,
                logoutUserFailed: false,
            }
        }
        case LOGOUT_USER_ERROR: {
            return {
                ...state,
                logoutUserRequest: false,
                logoutUserFailed: true,
            }
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: false,
                forgotPasswordCodeSend: false
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
                forgotPasswordCodeSend: true
            }
        }
        case FORGOT_PASSWORD_ERROR: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordFailed: true,
                forgotPasswordCodeSend: false
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordFailed: false,
                resetPasswordSuccess: false
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
                resetPasswordSuccess: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordFailed: true,
                resetPasswordSuccess: false
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                isAuthorization: true,
                user: action.user,
                getUserRequest: false,
                getUserFailed: false,
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest: false,
                getUserFailed: true,
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                updateUserRequest: false,
                updateUserFailed: false,
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
            }
        }
        default: { return state }
    }
};


export default authorizeReducer;
