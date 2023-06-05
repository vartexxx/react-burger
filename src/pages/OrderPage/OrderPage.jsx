import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { WS_CONNECTION_START, WS_CONNECTION_END } from '../../services/actions/wsActions';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { orders } = useSelector(state => state.wsReducer)
    const ingredientsData = useSelector(state => state.burgerIngredientsReducer.burgerIngredientsList);

    const order = orders.find((item) => item._id === params.id)
    const status = order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создан' : order?.status === 'pending' ? 'Готовится' : '';

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => { dispatch({ type: WS_CONNECTION_END }) }
    }, [dispatch]);

    const ingredientsList = useMemo(() => {
        return Array.from(new Set(
            ingredientsData.filter((item) => order?.ingredients.includes(item._id))
        ));
    }, [ingredientsData, order]);

    const countsObject = useMemo(() => {
        const counts = order?.ingredients.reduce((item, index) => {
            if (item.hasOwnProperty(index)) {
                item[index] += 1;
            } else {
                item[index] = 1;
            }
            return item;
        }, {});
        return counts
    }, [order]);

    const cost = useMemo(() => {
        let totalCost = 0;
            order?.ingredients.forEach((id) => {
                const ingredient = ingredientsList.find((item) => (item._id === id));
                totalCost += ingredient?.price;
            });
        return totalCost
    }, [ingredientsList, order]);

    return ( order &&
        <section className={`${styles.order__container} pt-30`}>
            <p className={`${styles.order__number} text text_type_digits-default`}>{`#${order?.number}`}</p>
            <p className='text text_type_main-medium pt-5'>{order?.name}</p>
            <p className='text text_type_main-default pt-2' style={order?.status === 'done' ? { color: '#00CCCC' } : {}}>{status}</p>
            <p className='text text_type_main-medium pt-15'>Состав:</p>
            <div className={`${styles.order__ingredients} mt-6`}>
                { ingredientsList.map((ingredient, index) => (
                    <div key={index} className={styles.order__ingredientsbox} >
                        <div className={styles.order__ingredient}>
                            <div className={styles.image__container} >
                                <img className={styles.order__image} src={ingredient?.image_mobile} alt={ingredient?.name} />
                            </div>
                            <p className='text text_type_main-default' style={{ maxWidth: '320px' }}>{ingredient?.name}</p>
                        </div>
                        <div className={`${styles.order__cost} mr-8`}>
                            <p className='text text_type_digits-default'>{`${countsObject[ingredient._id]} x ${ingredient?.price} `}</p>
                            <CurrencyIcon />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.order__dac}>
                <p className='text text_type_main-default text_color_inactive'>
                <FormattedDate date={new Date(order?.createdAt)} />
                </p>
                <div className={`${styles.order__total} mr-8`}>
                    <p className='text text_type_digits-default'>{`${cost}`}</p>
                    <CurrencyIcon />
                </div>
            </div>
        </section>
    )
};

export default OrderPage;
