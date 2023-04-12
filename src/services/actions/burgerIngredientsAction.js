import { getApi } from "../../utils/api";
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_STATUS_OK = 'GET_INGREDIENTS_STATUS_OK';
export const GET_INGREDIENTS_STATUS_ERR = 'GET_INGREDIENTS_STATUS_ERR';


export default function getIngredients() {
    return function (dispatch) {
        dispatch({ type: GET_INGREDIENTS})
        getApi()
            .then((res) =>{
                dispatch({ type: GET_INGREDIENTS_STATUS_OK, data: res.data })
            })
            .catch((err) => {
                dispatch({ type: GET_INGREDIENTS_STATUS_ERR, error: err })
            })
    }
};