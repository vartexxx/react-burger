import { IIngredient } from "../types/types";


export const ADD: 'ADD' = 'ADD';
export const DELETE: 'DELETE' = 'DELETE';
export const SORT: 'SORT' = 'SORT';

interface IAddIngredient {
    readonly type: typeof ADD,
    readonly id: string,
    readonly payload: IIngredient,
};
    
interface ISortIngredients {
    readonly type: typeof SORT,
    payload: Array<IIngredient>,
};
    
interface IDeleteIngredient {
    readonly type: typeof DELETE,
    readonly payload: IIngredient,
};

export type TConstructorAction =
    | IAddIngredient
    | ISortIngredients
    | IDeleteIngredient;
