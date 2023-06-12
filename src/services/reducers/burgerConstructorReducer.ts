import { ADD, DELETE, SORT, TBurgerConstructorActions } from "../actions/burgerConstructorAction";
import { TIngredientsInfo } from "../types/types";

type TInitialState = {
    burgerConstructorBun: undefined | string,
    burgerConstructorList: TIngredientsInfo,
}

const constructorInitialState: TInitialState = {
    burgerConstructorBun: undefined,
    burgerConstructorList: [],
};

const burgerConstructorReducer = ( state = constructorInitialState, action: TBurgerConstructorActions ) => {
    switch (action.type) {
        case ADD:
            if (action.payload.type === "bun") {
                return {
                    ...state,
                    burgerConstructorBun: action.payload,
                };
            }
            return {
                ...state,
                burgerConstructorList: [
                    ...state.burgerConstructorList,
                    { id: action.id, ...action.payload },
                ],
            }
        case DELETE:
            return {
                ...state,
                burgerConstructorList: state.burgerConstructorList.filter(
                    (item) => item._id !== action.payload._id
                ),
            }
        case SORT:
            return {
                ...state,
                burgerConstructorList: action.payload,
            }
        default:
            return state;
    }
};

export default burgerConstructorReducer;
