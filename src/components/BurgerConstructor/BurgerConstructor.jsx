import { useState, useContext, useMemo, useEffect } from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.scss';
import { BURGER_ORDER_RESET, makeOrder } from '../../services/actions/burgerOrderAction';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, DELETE, SORT } from '../../services/actions/burgerConstructorAction';
import { v4 as uuidv4 } from 'uuid';
import { Reorder } from "framer-motion"
import { useDrop } from 'react-dnd';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import { RESET_INGREDIENT_INFO } from '../../services/actions/burgerCurrentIngredientAction';
import BurgerConstructorOrder from '../BurgerConstructorOrder/BurgerConstructorOrder';
const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const [test1, setTest1] = useState(0);
    const { bun, burgerList } = useSelector((store) => ({
        bun: store.burgerConstructorReducer.burgerConstructorBunElement,
        burgerList: store.burgerConstructorReducer.burgerConstructorFillingList,
    }))
    function onDropHandler(ingredient) {
        dispatch({ type: ADD, id: uuidv4(), payload: ingredient });
    }
    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredients",
        drop(ingredient) {
          onDropHandler(ingredient);
        },
        collect: (monitor) => ({
          isHover: monitor.isOver(),
        }),
    });
    const bunPrice = useMemo(() =>{
        return bun === undefined ? 0 : bun.price * 2
    }, [bun]);
    useEffect(() => {
        const sum = burgerList.reduce(
          (current, total) => bunPrice + current + total.price, 0);
        setTest1(sum);
    }, [bun, burgerList]);
    console.log(test1)

    return(
        <section className={`${styles.burger__constructor} ml-4`}>
                <ul ref={dropTarget} className={isHover ? styles.burger__list_hover : styles.burger__list}>
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={bun === undefined ? "Выберите булку" : `${bun.name} (верх)`}
                        price={bun === undefined ? 0 : bun.price}
                        thumbnail={String(bun?.image)}
                    />
                    <Reorder.Group
                    axis='y'
                    className={styles.burger__container}
                    values={burgerList}
                    onReorder={(sortFillingList) => dispatch(
                        {type: SORT, payload: sortFillingList}
                    )}>
                        {burgerList.map((item) => {
                                return(
                                        <BurgerConstructorList
                                            key={item.constructorItemId}
                                            filling={item}
                                        />

                                )
                            })}
                    </Reorder.Group>

                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={bun === undefined ? "Выберите булку" : `${bun.name} (низ)`}
                        price={bun === undefined ? 0 : bun.price}
                        thumbnail={String(bun?.image)}
                    />
                </ul>

            <div className={`${styles.burger__order} mt-10 mr-4`}>
                <div className={styles.burger__price}>
                    <BurgerConstructorOrder price={test1} />
                </div>
            </div>
        </section>
    );
};

export default BurgerConstructor;
