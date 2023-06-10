import { getUserRequest } from "../../utils/api";
import refreshTokenAction from "./refreshTokenAction";
import { AppDispatch, AppThunk } from "../types/types";

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';


export interface IUser {
    name: string,
    email: string,
}

export interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS
}

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED
}

export type TGetUserAction =
    | IGetUserRequest
    | IGetUserSuccess
    | IGetUserFailed;


const getUserAction: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
    dispatch({
        type: GET_USER_REQUEST
    });
    getUserRequest()
    .then((res) => { 
        dispatch({ type: GET_USER_SUCCESS, user: res.user }) 
    })
    .catch(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            dispatch(refreshTokenAction());
            getUserRequest()
                .then((res) => {
                    dispatch({ type: GET_USER_SUCCESS, user: res.user })
                })
        }
        else { dispatch({ type: GET_USER_FAILED }) }
    })
}

export default getUserAction;
