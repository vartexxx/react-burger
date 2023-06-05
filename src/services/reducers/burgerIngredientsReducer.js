import { GET_INGREDIENTS, GET_INGREDIENTS_STATUS_ERR, GET_INGREDIENTS_STATUS_OK } from "../actions/burgerIngredientsAction";


const burgerIngredientsInitialState = {
    burgerIngredientsList: [],
    burgerIngredientsListErrorText: undefined,
};

const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
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
