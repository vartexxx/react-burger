import { BURGER_ORDER_FAILED, BURGER_ORDER_GET, BURGER_ORDER_OK, BURGER_ORDER_RESET } from "../actions/burgerOrderAction";
import { TBurgerOrderAction } from "../actions/burgerOrderAction";

type TInitalState = {
    order: undefined | number,
    orderError: undefined | string,
}

const burgerOrderInitialState: TInitalState = {
    order: 0,
    orderError: '',
};

const burgerOrderReducer = (state = burgerOrderInitialState, action: TBurgerOrderAction) => {
    switch(action.type) {
        case BURGER_ORDER_GET:
            return {
                ...state,
            }
        case BURGER_ORDER_OK:
            return {
                ...state,
                order: action.payload,
            }
        case BURGER_ORDER_FAILED:
            return {
                ...state,
                orderError: action.error,
            }
        case BURGER_ORDER_RESET:
            return {
                ...state,
                order: undefined,
            }
        default:
            return state
    }
};

export default burgerOrderReducer;
