import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { WS_CONNECTION_END, WS_CONNECTION_START } from "../../services/actions/wsActions";
import FeedOrderCard from "./FeedOrderCard/FeedOrderCard";
import styles from './FeedPage.module.scss';


const FeedPage = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector(state => state.wsReducer)

    const done = useMemo(() => orders.filter((item) => (item.status === 'done')), [orders]);
    const inWork = useMemo(() => orders.filter((item) => (item.status === 'pending' || item.status === 'created')), [orders]);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => { dispatch({ type: WS_CONNECTION_END }) }
    }, [dispatch])

    const filterToHour = (done) => {
        let dayOrders = done.filter((item) => (new Date(item.updatedAt)).getTime() >= (new Date()).getTime() - 1 * 60 * 60 * 1000);
        return dayOrders;
    }

    return (
        <section className={styles.feed}>
            <div className={`${styles.feed__list} mt-10`}>
                <h2 className="text text_type_main-large">Лента заказов</h2>
                <div className={`${styles.feed__container} mt-5`}>
                    {orders.map((item) => (
                        <FeedOrderCard order={item} key={uuidv4()} pathOrder={'/feed'}/>
                    ))}
                </div>
            </div>
            { total !== 0 && (
                <div className={`mt-25`}>
                    <div className={styles.feed__info}>
                        <div className={styles.feed__ready}>
                            <h4 className={`text text_type_main-medium`}>Готовы:</h4>
                            <div className={`${styles.feed__donecon} mt-4`}>
                                {filterToHour(done).map((item) => (
                                    <p className={`text text_type_digits-default ${styles.feed__done}`} key={uuidv4()}>{item.number}</p>
                                ))}
                            </div>
                        </div>
                        <div className={styles.feed__workcontainer}>
                            <h4 className={`text text_type_main-medium`}>В работе:</h4>
                            <div className={styles.feed__work}>
                                {inWork.map((item) => (
                                    <p key={uuidv4()}>{item.number}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.feed__orders} mt-15`}>
                        <div>
                            <h5 className={`text text_type_main-medium`}>Выполнены за все время:</h5>
                            <p className={`text text_type_digits-large ${styles.feed__number}`}>{total}</p>
                        </div>
                        <div>
                            <h5 className={`text text_type_main-medium`}>Выполнено за сегодня:</h5>
                            <p className={`text text_type_digits-large ${styles.feed__number}`}>{totalToday}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
};

export default FeedPage;
