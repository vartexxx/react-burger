import { useState, useMemo, useEffect } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, SORT } from '../../services/actions/burgerConstructorAction';
import { v4 as uuidv4 } from 'uuid';
import { Reorder } from "framer-motion"
import { useDrop } from 'react-dnd';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import BurgerConstructorOrder from '../BurgerConstructorOrder/BurgerConstructorOrder';


const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const [orderSum, setOrderSum] = useState(0);

    const { bun, burgerList } = useSelector((store) => ({
        bun: store.burgerConstructorReducer.burgerConstructorBunElement,
        burgerList: store.burgerConstructorReducer.burgerConstructorFillingList,
    }))

    const onDropHandler = (ingredient) => {
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
        setOrderSum(sum);
    }, [bun, burgerList]);

    return(
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
                            return(<BurgerConstructorList key={item.constructorItemId} filling={item} />)
                        })}
                    </Reorder.Group>
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={String(bun?.image)}
                    />
                </ul>  
            )}
            <div className={`${styles.burger__order} mt-10 mr-4`}>
                <div className={styles.burger__price}>
                    <BurgerConstructorOrder price={orderSum} />
                </div>
            </div>
        </section>
    );
};

export default BurgerConstructor;
