import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { wsActions } from "./actions/wsActions";
import socketMiddleware from "./middleware/socketMiddleware";
import { rootReducer } from "./reducers";

declare const window: any;

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
export const store = createStore(rootReducer, enhancer);
