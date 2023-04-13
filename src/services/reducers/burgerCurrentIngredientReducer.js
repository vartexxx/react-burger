import {SET_INGREDIENT_INFO, RESET_INGREDIENT_INFO} from '../actions/burgerCurrentIngredientAction';


const burgerCurrentIngredientInitialState = {
    currentIngredient: undefined,
}

export default function burgerCurrentIngredientReducer(state=burgerCurrentIngredientInitialState, action) {
    switch(action.type) {
        case SET_INGREDIENT_INFO:
            return {
                ...state,
                currentIngredient: action.payload,
            }
        case RESET_INGREDIENT_INFO:
            return {
                ...state,
                currentIngredient: undefined,
            }
        default:
            return state
    }
}