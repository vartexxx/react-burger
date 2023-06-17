import { getApi } from "../../utils/api";
import { AppDispatch, AppThunk, IIngredient } from "../types/types";


export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_STATUS_OK: 'GET_INGREDIENTS_STATUS_OK' = 'GET_INGREDIENTS_STATUS_OK';
export const GET_INGREDIENTS_STATUS_ERR: 'GET_INGREDIENTS_STATUS_ERR' = 'GET_INGREDIENTS_STATUS_ERR';

interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS
}

interface IGetIngredientsStatusOk {
    readonly type: typeof GET_INGREDIENTS_STATUS_OK,
    data: IIngredient[],
}

interface IGetIngredientsStatusErr {
    readonly type: typeof GET_INGREDIENTS_STATUS_ERR,
    readonly error: string,
}

export type TBurgerIngredientsAction =
    | IGetIngredients
    | IGetIngredientsStatusOk
    | IGetIngredientsStatusErr;
    
const getIngredients: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
    dispatch({ type: GET_INGREDIENTS})
    getApi()
        .then((res) =>{
            (res && res.success) ? dispatch({
                type: GET_INGREDIENTS_STATUS_OK,
                data: res.data,
            }) : dispatch({
                type: GET_INGREDIENTS_STATUS_ERR
            })
        })
        .catch((err) => {
            dispatch({ type: GET_INGREDIENTS_STATUS_ERR, error: err })
        })
};

export default getIngredients;
