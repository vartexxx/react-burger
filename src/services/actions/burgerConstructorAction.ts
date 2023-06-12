import { TIngredientInfo } from "../types/types";
export const ADD: 'ADD' = 'ADD';
export const DELETE: 'DELETE' = 'DELETE';
export const SORT: 'SORT' = 'SORT';

export type TIngredientConstructor = TIngredientInfo & { id?: string };
export interface IAdd {
    readonly type: typeof ADD;
    id: string,
    payload: TIngredientInfo
}
  
export interface IDelete {
    readonly type: typeof DELETE,
    payload: TIngredientConstructor,
}
  
export interface ISort {
    readonly type: typeof SORT;
    payload: TIngredientConstructor,
}
  
  
export type TBurgerConstructorActions =
    | IAdd
    | IDelete
    | ISort;