import { Middleware } from "redux";
import { refreshUserToken } from "../../utils/api";
import { getCookie } from "../../utils/cookie";
import { IWsActions } from "../actions/wsActions";


const socketMiddleware = (wsActions: IWsActions): Middleware => {
    return store => {
        let socket: WebSocket | null = null;
        let url: string = '';

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, wsInitOrders, onOpen, onOpenOrders, onError, onErrorOrders, onMessage, onMessageOrders, onClose, onCloseOrders } = wsActions;

            if (type === wsInit) { 
                url = payload;
                socket = new WebSocket(url) 
            }
            else {
                const token = getCookie('accessToken');
                if (type === wsInitOrders) {
                    url = payload;
                    const accessToken = token?.split('Bearer ')[1]
                    socket = new WebSocket(`${url}?token=${accessToken}`)
                }
            };
            if (socket && type === wsInit) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
                socket.onmessage = async event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if(parsedData.message === 'Invalid or missing token') {
                        try {
                            const refreshToken = await refreshUserToken();
                            const accessToken = refreshToken.accessToken;
                            const newurl = `${url}?token=${accessToken.replace('Bearer ', '')}`;
                            let socketRefresh = new WebSocket(newurl);
                            socketRefresh.onopen = event => {
                                dispatch({ type: onOpen, payload: event });
                            };
                            socketRefresh.onerror = event => {
                                dispatch({ type: onError, payload: event });
                            };
                            const { success, ...restParsedData } = parsedData;
                            dispatch({ type: onMessage, payload: restParsedData });
                            socketRefresh.onclose = event => {
                                dispatch({ type: onClose, payload: event });
                            };
                        }
                        catch(error) {
                            console.error('Ошибка обновления токена:', error)
                        }
                    }
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, payload: restParsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };
            }
            if (socket && type === wsInitOrders) {
                socket.onopen = event => {
                    dispatch({ type: onOpenOrders, payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: onErrorOrders, payload: event });
                };
                socket.onmessage = async event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if(parsedData.message === 'Invalid or missing token') {
                        try {
                            const refreshToken = await refreshUserToken();
                            const accessToken = refreshToken.accessToken;
                            const newurl = `${url}?token=${accessToken.replace('Bearer ', '')}`;
                            let socketRefresh = new WebSocket(newurl);
                            socketRefresh.onopen = event => {
                                dispatch({ type: onOpenOrders, payload: event });
                            };
                            socketRefresh.onerror = event => {
                                dispatch({ type: onErrorOrders, payload: event });
                            };
                            const { success, ...restParsedData } = parsedData;
                            dispatch({ type: onMessageOrders, payload: restParsedData });
                            socketRefresh.onclose = event => {
                                dispatch({ type: onCloseOrders, payload: event });
                            };
                        }
                        catch(error) {
                            console.error('Ошибка обновления токена:', error)
                        }
                    }
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessageOrders, payload: restParsedData });
                };
                socket.onclose = event => {
                    dispatch({ type: onCloseOrders, payload: event });
                };
            }
            next(action);
        };
    };
};

export default socketMiddleware;
