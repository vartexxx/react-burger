import { postApi } from "../../utils/api";


export const BURGER_ORDER_GET = 'BURGER_ORDER_GET';
export const BURGER_ORDER_OK = 'BURGER_ORDER_OK';
export const BURGER_ORDER_FAILED = 'BURGER_ORDER_FAILED';
export const BURGER_ORDER_RESET = 'BURGER_ORDER_RESET';

export function makeOrder(ingredients) {
    return function (dispatch) {
        const orderList = [
            ingredients.burgerConstructorBunElement._id,
            ...ingredients.burgerConstructorFillingList.map((item) => item._id),
            ingredients.burgerConstructorBunElement._id,
        ]
        dispatch({ type: BURGER_ORDER_GET })
        postApi(orderList)
            .then((res) => {
                dispatch({ type: BURGER_ORDER_OK, payload: res.order.number })
            })
            .catch((err) => {
                dispatch({ type: BURGER_ORDER_FAILED, error: `Ошибка ${err} при формировании заказа`})
            })
    }
}