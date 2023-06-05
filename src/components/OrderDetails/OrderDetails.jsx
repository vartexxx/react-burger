import { useSelector } from 'react-redux';
import img from '../../images/ok.svg';
import styles from './OrderDetails.module.scss';


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
            <div className={styles.container}>
                <p className='text text_type_digits-large' style={{ texAlign: 'center' }}>{order}</p>
                <p className='text text_type_main-medium pt-8' style={{ texAlign: 'center' }}>идентификатор заказа</p>
                <img className='mt-15 mb-15' src={img} alt='Ок' />
                <p className='text text_type_main-default pt-15' style={{ texAlign: 'center' }}>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive pt-2' style={{ texAlign: 'center' }}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    )
};

export default OrderDetails;
