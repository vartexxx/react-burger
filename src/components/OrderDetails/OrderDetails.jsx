import { useSelector } from 'react-redux';
import img from '../../images/ok.svg';
import styles from './OrderDetails.module.scss';


const OrderDetails = () => {
    const { order, orderError } = useSelector((store) => ({
        order: store.burgerOrderReducer.order,
        orderError: store.burgerOrderReducer.orderError,
    }))

    return (
        <>
            {orderError && (
                    alert(`Произошла ошибка при отправке запроса: ${orderError}`)
            )}
            <p className={`${styles.order} text text_type_digits-large mt-30`}>{order}</p>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <img className='mt-15 mb-15' src={img} alt='Ок' />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default mb-30' style={{color: '#8585AD'}}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
};

export default OrderDetails;
