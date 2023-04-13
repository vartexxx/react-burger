import { combineReducers } from "redux";
import burgerIngredientsReducer from './burgerIngredientsReducer';
import burgerConstructorReducer from "./burgerConstructorReducer";
import burgerOrderReducer from "./burgerOrderReducer";
import burgerCurrentIngredientReducer from './burgerIngredientsReducer';


export const rootReducer = combineReducers({
    burgerIngredientsReducer,
    burgerConstructorReducer,
    burgerOrderReducer,
    burgerCurrentIngredientReducer,
})