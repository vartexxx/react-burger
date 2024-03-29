import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Reorder } from "framer-motion";
import { FC, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ADD, SORT } from '../../services/actions/burgerConstructorAction';
import makeOrder, { BURGER_ORDER_RESET } from '../../services/actions/burgerOrderAction';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { IIngredient } from '../../services/types/types';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.scss';


const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { bun, burgerList, order, ingredients } = useSelector((store) => ({
        bun: store.burgerConstructorReducer.burgerConstructorBun,
        burgerList: store.burgerConstructorReducer.burgerConstructorList,
        order: store.burgerOrderReducer.order,
        ingredients: store.burgerConstructorReducer,
    }));

    const bunPrice = useMemo(() => {
        return bun === undefined ? 0 : bun.price * 2
    }, [bun]);

    const orderSum = useMemo(() => {
        const sum = burgerList.reduce(
            (sum, item) => sum + item.price, 0
        );
        return sum + bunPrice
    }, [burgerList, bunPrice])

    const closeModal = () => {
        dispatch({ type: BURGER_ORDER_RESET });
    };

    const onDropHandler = (ingredient: IIngredient) => {
        dispatch({ type: ADD, id: uuidv4(), payload: ingredient });
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredients",
        drop(ingredient: IIngredient) {
          onDropHandler(ingredient);
        },
        collect: (monitor) => ({
          isHover: monitor.isOver(),
        }),
    });

    return(
        <>
            <section ref={dropTarget} className={`${styles.burger__constructor} ml-4`}>
                {!bun ? (
                    <div className={isHover ? styles.burger__empty_hover : styles.burger__empty}>
                        <p className='text text_type_main-medium'>Добавьте булочки и ингредиенты 👈👈👈</p>
                    </div>
                ) : (
                    <ul ref={dropTarget} className={isHover ? styles.burger__list_hover : styles.burger__list}>
                        <ConstructorElement 
                            type='top'
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={String(bun?.image)}
                            extraClass='ml-5'
                        />
                        <Reorder.Group
                            axis='y'
                            className={styles.burger__container}
                            values={burgerList}
                            onReorder={(sortFillingList) => dispatch(
                                {type: SORT, payload: sortFillingList}
                            )}
                        >
                            {burgerList.map((item) => {
                                return(<BurgerConstructorList key={item.id} list={item} />)
                            })}
                        </Reorder.Group>
                        <ConstructorElement
                            type='bottom'
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={String(bun?.image)}
                            extraClass='ml-5'
                        />
                    </ul>  
                )}
                <div className={`${styles.burger__order} mt-10 mr-4`}>
                    <div className={styles.burger__price}>
                        <div className={styles.burger__getorder}>
                            <div className={styles.burger__getprice}>
                                <p className="text text_type_digits-medium">{orderSum}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                            <Button
                                htmlType="button"
                                type="primary"
                                size="large"
                                onClick={() => dispatch(makeOrder(ingredients))}
                                disabled={!ingredients.burgerConstructorBun}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            {order && (
                <Modal setActive={setIsOpen} header={''} onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
};


export default BurgerConstructor;
