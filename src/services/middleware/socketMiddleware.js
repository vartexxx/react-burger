import { refreshUserToken } from "../../utils/api";
import { getCookie } from "../../utils/cookie";


const socketMiddleware = (wsActions) => {
    return store => {
        let socket = null;
        let url = undefined;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onError, onMessage, onClose, wsInitOrders } = wsActions;

            if (type === wsInit) { 
                url = payload;
                socket = new WebSocket(url) 
            }
            else {
                if (type === wsInitOrders) {
                    url = payload;
                    socket = new WebSocket(`${url}?token=${getCookie('accessToken').split('Bearer ')[1]}`)
                }
            };
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if(parsedData.message === 'Invalid or missing token') {
                        try {
                            const refreshToken = refreshUserToken();
                            const accessToken = refreshToken.accessToken;
                            const url = `${url}?token=${accessToken.replace('Bearer ', '')}`;
                            let socketRefresh = new WebSocket(url);
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
            next(action);
        };
    };
};

export default socketMiddleware;
