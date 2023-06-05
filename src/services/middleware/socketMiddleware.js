import { getCookie } from "../../utils/cookie";


const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onError, onMessage, onClose, wsInitOrders } = wsActions;

            if (type === wsInit) { socket = new WebSocket(`${wsUrl}/all`) }
            else {
                if (type === wsInitOrders) {
                    socket = new WebSocket(`${wsUrl}?token=${getCookie('accessToken').split('Bearer ')[1]}`)
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
