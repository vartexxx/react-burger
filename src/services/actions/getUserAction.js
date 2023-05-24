import { getUserRequest } from "../../utils/api";
import refreshTokenAction from "./refreshTokenAction";


export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';


const getUserAction = () => (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST
    });
    getUserRequest()
    .then(res => { 
        dispatch({ type: GET_USER_SUCCESS, user: res.user }) 
    })
    .catch(() => {
        const refreshToken = localStorage.getItem('jwt');
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
