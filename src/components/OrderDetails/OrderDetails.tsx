import img from '../../images/ok.svg';
import styles from './OrderDetails.module.scss';
import { useSelector } from '../../services/types/hooks';

const OrderDetails = () => {
    const { order, orderError } = useSelector((store) => ({
        order: store.burgerOrderReducer.order,
        orderError: store.burgerOrderReducer.orderError,
    }));

    return (
        <>
            {orderError && (
                    alert(`Произошла ошибка при отправке запроса: ${orderError}`)
            )}
            <div className={styles.order__container}>
                <p className={`${styles.order__number} text text_type_digits-large`}>{order}</p>
                <p className={`${styles.order__index}text text_type_main-medium pt-8`}>идентификатор заказа</p>
                <img className='mt-15 mb-15' src={img} alt='Ок' />
                <p className={`${styles.order__ready}text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
                <p className={`${styles.order__wait}text text_type_main-default text_color_inactive pt-2`}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
};

export default OrderDetails;
