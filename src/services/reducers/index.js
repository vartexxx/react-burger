import { combineReducers } from "redux";
import authorizeReducer from "./authorizeReducer";
import burgerConstructorReducer from "./burgerConstructorReducer";
import burgerCurrentIngredientReducer from "./burgerCurrentIngredientReducer";
import burgerIngredientsReducer from './burgerIngredientsReducer';
import burgerOrderReducer from "./burgerOrderReducer";
import orderCurrentReducer from "./orderCurrentReducer";
import wsReducer from "./wsReducer";
import wsReducerForOrders from "./wsReducerForOrders";


export const rootReducer = combineReducers({
    burgerIngredientsReducer,
    burgerConstructorReducer,
    burgerOrderReducer,
    burgerCurrentIngredientReducer,
    authorizeReducer,
    orderCurrentReducer,
    wsReducer,
    wsReducerForOrders,
});
