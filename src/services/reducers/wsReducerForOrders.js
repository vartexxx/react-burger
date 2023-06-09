import { 
    WS_CONNECTION_ORDERS_CLOSED,
    WS_CONNECTION_ORDERS_END,
    WS_CONNECTION_ORDERS_ERROR,
    WS_CONNECTION_ORDERS_SUCCESS,
    WS_GET_ORDERS_MESSAGE
} from "../actions/wsActions";


const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false
};
  
const wsReducerForOrders = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_ORDERS_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_GET_ORDERS_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        case WS_CONNECTION_ORDERS_CLOSED:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false
            };
        case WS_CONNECTION_ORDERS_END:
            return {
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false
            };
        case WS_CONNECTION_ORDERS_ERROR:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false
            };
        default: 
            return state;
    }
};

export default wsReducerForOrders;
