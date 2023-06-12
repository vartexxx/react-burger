import { GET_INGREDIENTS, GET_INGREDIENTS_STATUS_ERR, GET_INGREDIENTS_STATUS_OK } from "../actions/burgerIngredientsAction";
import { TBurgerIngredientsAction } from "../actions/burgerIngredientsAction";


type TInitialState = {
    burgerIngredientsList: string[],
    burgerIngredientsListErrorText: undefined | string;
}

const burgerIngredientsInitialState: TInitialState = {
    burgerIngredientsList: [],
    burgerIngredientsListErrorText: undefined,
};

const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action: TBurgerIngredientsAction) => {
    switch(action.type) {
        case GET_INGREDIENTS:
            return {...state, burgerIngredientsListOk: true}
        case GET_INGREDIENTS_STATUS_OK:
            return {
                ...state,
                burgerIngredientsList: action.data,
            }
        case GET_INGREDIENTS_STATUS_ERR:
            return {
                burgerIngredientsListErrorText: action.error,
            }
        default:
            { return state }
    }
};

export default burgerIngredientsReducer;
