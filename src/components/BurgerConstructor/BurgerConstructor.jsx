import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data';
import styles from './BurgerConstructor.module.scss';

function BurgerConstructor() {
    return(
        <section className={`${styles.burger__constructor} ml-4`}>
            <ul className={styles.burger__container}>
                <li className='pl-2'>
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text={data[0].name}
                        price={data[0].price}
                        thumbnail={data[0].image}
                    />
                </li>
                <ul className={`${styles.burger__list} pr-2`}>
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
                <li className='pl-2'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={data[data.length - 1].name}
                        price={data[data.length - 1].price}
                        thumbnail={data[data.length - 1].image}
                    />
                </li>
            </ul>
            <div className={`${styles.burger__order} mt-10 mr-4`}>
                <div className={styles.burger__price}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType='button' type='primary' size='large'>Оформить заказ</Button>
            </div>
        </section>
    )
};

export { BurgerConstructor };
