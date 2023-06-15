import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useSelector } from "../../services/types/hooks";
import styles from './OrderFullWindow.module.scss';


const OrderFullWindow: FC = () => {
    const { order } = useSelector((state) => state.orderCurrentReducer);
    const ingredients = useSelector(state => state.burgerIngredientsReducer.burgerIngredientsList);
    const status = 
        order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создан' : order?.status === 'pending' ? 'Готовится' : '';

    const ingredientsList = useMemo(() => {
        return Array.from(new Set(
            ingredients.filter((item) => order?.ingredients.includes(item._id))
        ));
    }, [ingredients, order]);

    const ingredientsCount = useMemo(() => {
        const counts = order?.ingredients.reduce((item: {[a: string]: number}, index) => {
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
        let total = 0;
        order?.ingredients.forEach((id) => {
            const ingredient = ingredientsList.find((item) => (item._id === id));
            if (ingredient) { total += ingredient.price };
        });
        return total
    }, [ingredientsList, order]);

    return (
        <section className={`${styles.order__container} pt-4 pb-30`}>
            <p className='text text_type_main-medium pt-5'>{order?.name}</p>
            <p className='text text_type_main-default pt-2' style={order?.status === 'done' ? { color: '#00CCCC' } : {}}>{status}</p>
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
                            <p className='text text_type_digits-default'>{ingredientsCount ? `${ingredientsCount[ingredient._id]} x ${ingredient?.price} `: 0}</p>
                            <CurrencyIcon type={"primary"} />
                        </div>
                    </div>
                ))}
            </div>
                <div className={styles.order__dac}>
                    {order && (
                        <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(order.createdAt)} /></p>
                    )}
                    <div className={styles.order__total}>
                        <p className='text text_type_digits-default'>{`${cost}`}</p>
                        <CurrencyIcon type={"primary"} />
                    </div>
                </div>
        </section>
    )
};

export default OrderFullWindow;
