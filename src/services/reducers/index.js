import { combineReducers } from "redux";
import burgerIngredientsReducer from './burgerIngredientsReducer';


export const rootReducer = combineReducers({
    burgerIngredientsReducer,
})