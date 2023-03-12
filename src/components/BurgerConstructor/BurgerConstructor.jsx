import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.scss';

function BurgerConstructor({data}) {
    return(
        <section className={`${styles.burger__constructor} ml-4`}>
            <ul className={styles.burger__container}>
                <li className='pl-2'>
                    <ConstructorElement 
                        type='top'
                        isLocked={true}
                        text='Краторная булка N-200i (верх)'
                        price='1255'
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
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
                        type='bottom'
                        isLocked={true}
                        text='Краторная булка N-200i (низ)'
                        price='1255'
                        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
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
