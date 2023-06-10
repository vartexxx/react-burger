import { changeUserData } from "../../utils/api";
import { AppThunk, AppDispatch } from "../types/types";
import { IUser } from "./getUserAction";

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export interface IUserUpdateRequest {
    readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUserUpdateSuccess {
    readonly type: typeof UPDATE_USER_SUCCESS,
    user: IUser
}

export interface IUserUpdateFailed {
    readonly type: typeof UPDATE_USER_FAILED
}

export type TUserUpdateAction =
    | IUserUpdateRequest
    | IUserUpdateSuccess
    | IUserUpdateFailed;

const updateUserAction: AppThunk = (data: string[]) => (dispatch: AppDispatch) => {
    dispatch({
        type: UPDATE_USER_REQUEST
    })
    changeUserData(data)
    .then((res) => {
        dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res.user,
        })
    })
    .catch(() => {
        dispatch({ type: UPDATE_USER_FAILED })
    })
};

export default updateUserAction;
