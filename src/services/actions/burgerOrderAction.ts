import { postApi } from "../../utils/api";
import { AppDispatch, AppThunk } from "../types/types";


export const BURGER_ORDER_GET: 'BURGER_ORDER_GET' = 'BURGER_ORDER_GET';
export const BURGER_ORDER_OK: 'BURGER_ORDER_OK' = 'BURGER_ORDER_OK';
export const BURGER_ORDER_FAILED: 'BURGER_ORDER_FAILED' = 'BURGER_ORDER_FAILED';
export const BURGER_ORDER_RESET: 'BURGER_ORDER_RESET' = 'BURGER_ORDER_RESET';

interface IGetOrder {
    readonly type: typeof BURGER_ORDER_GET,
};

interface IOkOrder {
    readonly type: typeof BURGER_ORDER_OK,
    payload: number,
};

interface IFailedOrder {
    readonly type: typeof BURGER_ORDER_FAILED,
    readonly error: string,
};

interface IResetOrder {
    readonly type: typeof BURGER_ORDER_RESET,
};

export type TBurgerOrderAction =
    | IGetOrder
    | IOkOrder
    | IFailedOrder
    | IResetOrder;

const makeOrder: AppThunk = (ingredients) => (dispatch: AppDispatch) => {
        const orderList = [
            ingredients.burgerConstructorBun._id,
            ...ingredients.burgerConstructorList.map((item: { _id: string; }) => item._id),
            ingredients.burgerConstructorBun._id,
        ]
        dispatch({ type: BURGER_ORDER_GET })
        postApi(orderList)
            .then((res) => {
                dispatch({ type: BURGER_ORDER_OK, payload: res.order.number })
            })
            .catch((err) => {
                dispatch({ type: BURGER_ORDER_FAILED, error: `Ошибка ${err} при формировании заказа`})
            })
};

export default makeOrder;
