import { GET_CURRENT_ORDER_INFO, REMOVE_CURRENT_ORDER_INFO } from "../actions/orderCurrentAction";

const initalState = {
    order: undefined
}

const orderCurrentReducer = (state = initalState, action) => {
    switch(action.type) {
        case GET_CURRENT_ORDER_INFO:
            return {
                ...state,
                order: action.order,
            }
        case REMOVE_CURRENT_ORDER_INFO:
            return {
                ...state,
                order: undefined,
            }
        default:
            return state
    }
};

export default orderCurrentReducer;
