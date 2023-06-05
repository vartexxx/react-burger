import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_END,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/wsActions";

const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false
};

const wsReducer = (state=initialState, action) => {
    switch(action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            }
        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false,
            }
        case WS_CONNECTION_END:
            return {
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false,  
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                orders: [],
                total: 0,
                totalToday: 0,
                wsConnected: false,
            }
        default:
            return state
    }
};

export default wsReducer;
