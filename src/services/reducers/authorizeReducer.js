import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR } from "../actions/registerUserAction";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from "../actions/loginUserAction";
import { FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../actions/forgotPasswordAction";
import { RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../actions/resetPasswordAction";


const initialState = {
    user: { name: '', email: '' },
    isAuthorization: false,
  
    registerRequest: false,
    registerFailed: false,
  
    loginRequest: false,
    loginFailed: false,

    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    forgotPasswordCodeSend: false,

    resetPasswordRequest: false,
    resetPasswordFailed: false,
    resetPasswordSuccess: false,
}


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
        default: { return state }
    }
}


export default authorizeReducer;