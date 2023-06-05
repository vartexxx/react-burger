import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { wsActions, wsActionsOrders } from "./actions/wsActions";
import socketMiddleware from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers";


const wsUrl = 'wss://norma.nomoreparties.space/orders';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsActionsOrders)));
export const store = createStore(rootReducer, enhancer);
