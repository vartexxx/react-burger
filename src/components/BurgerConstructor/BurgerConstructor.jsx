import { useState, useContext, useMemo } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.scss';
import { BurgerIngredientsContext } from '../../utils/context';
import { postApi } from '../../utils/api';


const BurgerConstructor = () => {
    const [modal, setModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState(undefined);
    const [error, setError] = useState('');
    const ingredients = useContext(BurgerIngredientsContext);
    
    const bun = useMemo(() => {
        return ingredients.filter((item) => item.type === 'bun');
    }, [ingredients])[1];

    const ingredientsWithoutBun = useMemo(() => {
        return ingredients.filter((item) => item.type !== 'bun').slice(1, 7);
    }, [ingredients]);

    const totalPrice = useMemo(() => {
        return bun?.price * 2 + ingredientsWithoutBun.reduce((sum, item) => sum + item.price, 0);
    }, [bun, ingredients]);

    const toggleModal = () => {
        setModal((prevModal) => !prevModal)
    };

    const makeOrder = () => {
        const data = [bun?._id].concat(ingredientsWithoutBun.map((item) => item._id));
        postApi(data)
            .then((res) => {
                setOrderNumber(res.order.number)
            })
            .then(() => {
                toggleModal()
            })
            .catch((err) => {
                setError(err);
            })
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
                    {ingredientsWithoutBun.map((item) => {
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
                <Button onClick={makeOrder} htmlType='button' type='primary' size='large'>Оформить заказ</Button>
                {error && (
                    alert(`Произошла ошибка при отправке запроса: ${error}`)
                )}
                {modal && (
                        <Modal onClose={toggleModal}>
                            <OrderDetails orderNumber={orderNumber}/>
                        </Modal>
                )}
            </div>
        </section>
    );
};

export default BurgerConstructor;
