import { BURGER_ORDER_GET, BURGER_ORDER_OK, BURGER_ORDER_FAILED, BURGER_ORDER_RESET } from "../actions/burgerOrderAction";


const burgerOrderInitialState = {
    order: undefined,
    orderRequest: false,
    orderFailedText: undefined,
}

export default function burgerOrderReducer(state = burgerOrderInitialState, action) {
    switch(action.type) {
        case BURGER_ORDER_GET:
            return {
                ...state,
                orderRequest: true,
            }
        case BURGER_ORDER_OK:
            return {
                ...state,
                order: action.payload,
            }
        case BURGER_ORDER_FAILED:
            return {
                ...state,
                orderRequest: false,
                orderFailedText: action.error,
            }
        case BURGER_ORDER_RESET:
            return {
                ...state,
                order: undefined,
            }
        default:
            return state
    }
}