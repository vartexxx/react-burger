import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import React from 'react';
import styles from './BurgerConstructor.module.scss';

function BurgerConstructor() {
    return(
        <section className={styles.burger__constructor}>
            <ul className={styles.burger__container}>
                <li className={styles.burger__bun}>
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={data[0].name}
                        price={data[0].price}
                        thumbnail={data[0].image}
                    />
                </li>
                <ul className={styles.burger__list}>
                    {data.map((item) => {
                        if(item.type !== 'bun') {
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
                        }
                    })}
                </ul>
                <li>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={data[data.length - 1].name}
                        price={data[data.length - 1].price}
                        extraClass="ml-8"
                        thumbnail={data[data.length - 1].image}
                    />
                </li>
            </ul>
            <div className={styles.burger__order}>
                <div className={styles.burger__price}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType='button' type='primary' size='large'>Оформить заказ</Button>
            </div>
        </section>
    )
}

export {BurgerConstructor};