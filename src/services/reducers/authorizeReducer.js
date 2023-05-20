import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR } from "../actions/registerUserAction";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from "../actions/loginUserAction";


const initialState = {
    user: { name: '', email: '' },
    isAuthorization: false,
  
    registerRequest: false,
    registerFailed: false,
  
    loginRequest: false,
    loginFailed: false,
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
        default: { return state }
    }
}


export default authorizeReducer;