import { useSelector, useDispatch } from "react-redux";
import styles from './BurgerConstructorOrder.module.scss'
import { makeOrder } from "../../services/actions/burgerOrderAction";
import Modal from "../Modal/Modal";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import { BURGER_ORDER_RESET } from "../../services/actions/burgerOrderAction";
import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructorOrder({ price }) {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.burgerOrderReducer.order);
  const ingredients = useSelector((store) => store.burgerConstructorReducer);
  const closeModal = () => {
    dispatch({ type: BURGER_ORDER_RESET });
  }
  return (
    <div className={styles.order}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => dispatch(makeOrder(ingredients))}
        disabled={!ingredients.burgerConstructorBunElement}
      >
        Оформить заказ
      </Button>
      {order && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
