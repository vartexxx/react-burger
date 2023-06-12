import { getApi } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types/types";

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_STATUS_OK: 'GET_INGREDIENTS_STATUS_OK' = 'GET_INGREDIENTS_STATUS_OK';
export const GET_INGREDIENTS_STATUS_ERR: 'GET_INGREDIENTS_STATUS_ERR' = 'GET_INGREDIENTS_STATUS_ERR';

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS
}

export interface IGetIngredientsStatusOk {
    readonly type: typeof GET_INGREDIENTS_STATUS_OK,
    data: TIngredient[]
}

export interface IGetIngredientsStatusErr {
    readonly type: typeof GET_INGREDIENTS_STATUS_ERR,
    readonly error: string
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
