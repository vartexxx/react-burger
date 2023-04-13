import { ADD, DELETE, SORT } from "../actions/burgerConstructorAction";


const burgerConstructorInitialState = {
    burgerConstructorBun: undefined,
    burgerConstructorList: [],
}

export default function burgerConstructorReducer(state=burgerConstructorInitialState, action) {
    switch(action.type) {
        case ADD:
            if(action.payload.type === 'bun') {
                return {
                    ...state,
                    burgerConstructorBun: action.payload,
                }
            }
            return {
                ...state,
                burgerConstructorList: [
                    ...state.burgerConstructorList,
                    { constructorItemId: action.id, ...action.payload }
                ],
            }
        default:
            return state
    }
}