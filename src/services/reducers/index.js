import { combineReducers } from "redux";
import burgerIngredientsReducer from './burgerIngredientsReducer';
import burgerConstructorReducer from "./burgerConstructorReducer";
import burgerOrderReducer from "./burgerOrderReducer";
import burgerCurrentIngredientReducer from "./burgerCurrentIngredientReducer";
import authorizeReducer from "./authorizeReducer";

export const rootReducer = combineReducers({
    burgerIngredientsReducer,
    burgerConstructorReducer,
    burgerOrderReducer,
    burgerCurrentIngredientReducer,
    authorizeReducer,
});
