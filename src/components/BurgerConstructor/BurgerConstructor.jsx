import { useState, useContext, useMemo } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.scss';
import { makeOrder } from '../../services/actions/burgerOrderAction';
import { useDispatch, useSelector } from 'react-redux';


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const bun = useSelector(
        (store) => store.burgerConstructorReducer.burgerConstructorBun
    );
    const burgerList = useSelector(
        (store) => store.burgerConstructorReducer.burgerConstructorList
    );
    const order = useSelector(
        (store) => store.burgerOrderReducer.order
    )
    const ingredients = useSelector(
        (store) => store.burgerConstructorReducer
    )
    const bunPrice = useMemo(() =>{
        return bun === undefined ? 0 : bun.price * 2
    }, [bun]);
    const burgerListPrice = useMemo(() => {
        return burgerList.reduce((sum, item) => sum + item.pirce, 0);
    }, [burgerList]);
    const totalPrice = useMemo(() => {
        return bun === undefined ? burgerListPrice : burgerListPrice + bunPrice
    }, [bunPrice, burgerListPrice, bun]);

    const [modal, setModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState(undefined);
    const [error, setError] = useState('');

    const toggleModal = () => {
        setModal((prevModal) => !prevModal)
    };

    return(
        <section className={`${styles.burger__constructor} ml-4`}>
            <ul className={styles.burger__container}>
                <li className='pl-2'>
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={`${bun?.name} (верх)`}
                        price={Number(bun?.price)}
                        thumbnail={String(bun?.image)}
                    />
                </li>
                <ul className={`${styles.burger__list} pr-2`}>
                    {burgerList.map((item) => {
                        return(
                            <li key={item._id} className={styles.burger__item}>
                                <DragIcon type="primary" />
                                <ConstructorElement 
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        )
                    })}
                </ul>
                <li className='pl-2'>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun?.name} (низ)`}
                        price={Number(bun?.price)}
                        thumbnail={String(bun?.image)}
                    />
                </li>
            </ul>
            <div className={`${styles.burger__order} mt-10 mr-4`}>
                <div className={styles.burger__price}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => dispatch(makeOrder(ingredients))} htmlType='button' type='primary' size='large'>Оформить заказ</Button>
                {error && (
                    alert(`Произошла ошибка при отправке запроса: ${error}`)
                )}
                {modal && (
                        <Modal onClose={toggleModal}>
                            {/* <OrderDetails orderNumber={orderNumber}/> */}
                        </Modal>
                )}
            </div>
        </section>
    );
};

export default BurgerConstructor;
