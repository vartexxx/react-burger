import { TIngredientInfo } from "../types/types";
export const SET_INGREDIENT_INFO: 'SET_INGREDIENT_INFO' = 'SET_INGREDIENT_INFO';
export const RESET_INGREDIENT_INFO: 'RESET_INGREDIENT_INFO' = 'RESET_INGREDIENT_INFO';


export interface ISetIngredientCurrentInfo {
    readonly type: typeof SET_INGREDIENT_INFO;
    payload: TIngredientInfo
}
  
export interface IResetIngredientCurrentInfo {
    readonly type: typeof RESET_INGREDIENT_INFO;
}
  
export type TIngredientCurrentAction =
    | ISetIngredientCurrentInfo
    | IResetIngredientCurrentInfo;