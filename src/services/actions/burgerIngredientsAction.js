import { getApi } from "../../utils/api";
import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_STATUS_OK,
    GET_INGREDIENTS_STATUS_ERR
} from "../../utils/constants";


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