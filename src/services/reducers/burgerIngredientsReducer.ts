import { GET_INGREDIENTS, GET_INGREDIENTS_STATUS_ERR, GET_INGREDIENTS_STATUS_OK } from "../actions/burgerIngredientsAction";
import { TBurgerIngredientsAction } from "../actions/burgerIngredientsAction";
import { IIngredient } from "../types/types";

export interface IIngredientsInitialState {
    burgerIngredientsList: Array<IIngredient>;
    burgerIngredientsListErrorText: string | undefined;
}

const burgerIngredientsInitialState: IIngredientsInitialState = {
    burgerIngredientsList: [],
    burgerIngredientsListErrorText: undefined,
};

const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action: TBurgerIngredientsAction): IIngredientsInitialState => {
    switch(action.type) {
        case GET_INGREDIENTS:
            return {...state}
        case GET_INGREDIENTS_STATUS_OK:
            return {
                ...state,
                burgerIngredientsList: action.data,
            }
        case GET_INGREDIENTS_STATUS_ERR:
            return {
                burgerIngredientsList: [],
                burgerIngredientsListErrorText: action.error,
            }
        default:
            { return state }
    }
};

export default burgerIngredientsReducer;
