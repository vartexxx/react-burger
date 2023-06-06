export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_END = 'WS_CONNECTION_END';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';

export const WS_CONNECTION_ORDERS_START = 'WS_CONNECTION_ORDERS_START';
export const WS_CONNECTION_ORDERS_SUCCESS = 'WS_CONNECTION_ORDERS_SUCCESS';
export const WS_CONNECTION_ORDERS_ERROR = 'WS_CONNECTION_ORDERS_ERROR';
export const WS_GET_ORDERS_MESSAGE = 'WS_GET_ORDERS_MESSAGE';
export const WS_CONNECTION_ORDERS_CLOSED = 'WS_CONNECTION_ORDERS_CLOSED';
export const WS_SEND_ORDERS_MESSAGE = 'WS_SEND_ORDERS_MESSAGE';
export const WS_CONNECTION_ORDERS_END = 'WS_CONNECTION_ORDERS_END';

export const wsConnectionStart = (url) => {
    return {
        type: WS_CONNECTION_START,
        payload: url,
    }
};


export const wsOrderConnectionStart = (url) => {
    return {
        type: WS_CONNECTION_ORDERS_START,
        payload: url,
    }
}

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    onClose: WS_CONNECTION_CLOSED,
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: WS_CONNECTION_END,
};

export const wsActionsOrders = {
    wsInitOrders: WS_CONNECTION_ORDERS_START,
    onOpen: WS_CONNECTION_ORDERS_SUCCESS,
    onError: WS_CONNECTION_ORDERS_ERROR,
    onMessage: WS_GET_ORDERS_MESSAGE,
    onClose: WS_CONNECTION_ORDERS_CLOSED,
    wsSendMessage: WS_SEND_ORDERS_MESSAGE,
    wsClose: WS_CONNECTION_ORDERS_END
};
