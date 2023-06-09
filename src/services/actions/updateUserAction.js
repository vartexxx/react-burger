import { changeUserData, refreshUserToken } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS } from "./refreshTokenAction";


export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';


const updateUserAction = (data) => (dispatch) => {
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
