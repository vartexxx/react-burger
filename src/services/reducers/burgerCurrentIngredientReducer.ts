import { RESET_INGREDIENT_INFO, SET_INGREDIENT_INFO } from '../actions/burgerCurrentIngredientAction';
import { TIngredientCurrentAction } from '../actions/burgerCurrentIngredientAction';

type TInitialState = {
    currentIngredient: undefined | string[]
}

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
