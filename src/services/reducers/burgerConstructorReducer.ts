import { ADD, DELETE, SORT, TConstructorAction } from "../actions/burgerConstructorAction";
import { TIngredientsInfo } from "../types/types";
import { IIngredient } from "../types/types";
export interface IConstructorInitialState {
    burgerConstructorBun: IIngredient | undefined;
    burgerConstructorList: Array<IIngredient>;
}


const constructorInitialState: IConstructorInitialState = {
    burgerConstructorBun: undefined,
    burgerConstructorList: [],
};

const burgerConstructorReducer = ( state = constructorInitialState, action: TConstructorAction ): IConstructorInitialState => {
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
