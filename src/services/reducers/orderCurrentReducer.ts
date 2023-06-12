import { GET_CURRENT_ORDER_INFO, REMOVE_CURRENT_ORDER_INFO } from "../actions/orderCurrentAction";
import { TOrderInfo } from "../types/types";


export interface IGetCurrentOrderInfo {
    readonly type: typeof GET_CURRENT_ORDER_INFO;
    order: TOrderInfo
  }
  
export interface IRemoveCurrentOrderInfo {
    readonly type: typeof REMOVE_CURRENT_ORDER_INFO
}
  
export type TOrderCurrentInfoActons =
    | IGetCurrentOrderInfo
    | IRemoveCurrentOrderInfo;

type TInitialState = {
    order: TOrderInfo | null
};

const initalState: TInitialState = {
    order: null
}

const orderCurrentReducer = (state = initalState, action: TOrderCurrentInfoActons) => {
    switch(action.type) {
        case GET_CURRENT_ORDER_INFO:
            return {
                ...state,
                order: action.order,
            }
        case REMOVE_CURRENT_ORDER_INFO:
            return {
                ...state,
                order: undefined,
            }
        default:
            return state
    }
};

export default orderCurrentReducer;
