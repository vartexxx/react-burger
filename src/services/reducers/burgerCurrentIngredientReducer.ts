import { RESET_INGREDIENT_INFO, SET_INGREDIENT_INFO, TIngredientCurrentAction } from '../actions/burgerCurrentIngredientAction';
import { IIngredient } from '../types/types';


type TInitialState = {
    currentIngredient: undefined | IIngredient,
};

const burgerCurrentIngredientInitialState: TInitialState = {
    currentIngredient: undefined,
};

const burgerCurrentIngredientReducer = (state=burgerCurrentIngredientInitialState, action: TIngredientCurrentAction) => {
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
};

export default burgerCurrentIngredientReducer;
