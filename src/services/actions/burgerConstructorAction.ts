import { IIngredient } from "../types/types";
export const ADD: 'ADD' = 'ADD';
export const DELETE: 'DELETE' = 'DELETE';
export const SORT: 'SORT' = 'SORT';

// export type TIngredientConstructor = TIngredientInfo & { id?: string };
// export interface IAdd {
//     readonly type: typeof ADD;
//     id: string,
//     payload: TIngredientInfo
// }
  
// export interface IDelete {
//     readonly type: typeof DELETE,
//     payload: TIngredientConstructor,
// }
  
// export interface ISort {
//     readonly type: typeof SORT;
//     payload: TIngredientConstructor,
// }
  
  
// export type TBurgerConstructorActions =
//     | IAdd
//     | IDelete
//     | ISort;


export interface IAddIngredient {
    readonly type: typeof ADD;
    readonly id: string;
    readonly payload: IIngredient;
    }
    
export interface ISortIngredients {
    readonly type: typeof SORT;
    payload: Array<IIngredient>;
    }
    
export interface IDeleteIngredient {
    readonly type: typeof DELETE;
    readonly payload: IIngredient;
}
    
export type TConstructorAction =
    | IAddIngredient
    | ISortIngredients
    | IDeleteIngredient;