import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from './OrderFullWindow.module.scss';


const OrderFullWindow = () => {
    const order = useSelector((state) => state.orderCurrentReducer.order);
    const ingredients = useSelector(state => state.burgerIngredientsReducer.burgerIngredientsList);
    const status = order.status === 'done' ? 'Выполнен' : order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : '';

    const ingredientsList = useMemo(() => {
        return Array.from(new Set(
            ingredients.filter((item) => order.ingredients.includes(item._id))
        ));
    }, [ingredients, order]);

    const ingredientsCount = useMemo(() => {
        const counts = order.ingredients.reduce((item, index) => {
            if (item.hasOwnProperty(index)) {
                item[index] += 1;
            } else {
                item[index] = 1;
            }
            return item;
        }, {});
        return counts
    }, [order])

    const cost = useMemo(() => {
        let total = 0;
        order.ingredients.forEach((id) => {
            const ingredient = ingredientsList.find((item) => (item._id === id));
            total += ingredient?.price;
        });
        return total
    }, [ingredientsList, order])

    return (
        <section className={`${styles.order__container} pt-4 pb-30`}>
            <p className='text text_type_main-medium pt-5'>{order.name}</p>
            <p className='text text_type_main-default pt-2' style={order.status === 'done' ? { color: '#00CCCC' } : {}}>{status}</p>
            <p className='text text_type_main-medium pt-15'>Состав:</p>
            <div className={`${styles.order__ingredients} mt-6`}>
                { ingredientsList.map((ingredient, index) => (
                    <div key={index} className={styles.ingredients_box}>
                        <div className={styles.order__ingredient}>
                            <div className={styles.order__imagecontainer} >
                                <img className={styles.order__image} src={ingredient?.image_mobile} alt={ingredient?.name} />
                            </div>
                            <p className='text text_type_main-default'>{ingredient?.name}</p>
                        </div>
                        <div className={styles.order__cost}>
                            <p className='text text_type_digits-default'>{`${ingredientsCount[ingredient._id]} x ${ingredient?.price} `}</p>
                            <CurrencyIcon />
                        </div>
                    </div>
                ))}
            </div>
                <div className={styles.order__dac}>
                    <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(order.createdAt)} /></p>
                    <div className={styles.order__total}>
                        <p className='text text_type_digits-default'>{`${cost}`}</p>
                        <CurrencyIcon />
                    </div>
                </div>
        </section>
    )
};

export default OrderFullWindow;
