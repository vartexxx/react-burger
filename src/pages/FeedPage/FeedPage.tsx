import { FC, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import { WS_CONNECTION_END, wsConnectionStart } from "../../services/actions/wsActions";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { TOrderInfo } from "../../services/types/types";
import { WS_URL_ALL } from "../../utils/variables";
import FeedOrderCard from "./FeedOrderCard/FeedOrderCard";
import styles from './FeedPage.module.scss';


const FeedPage: FC = () => {
    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector(state => state.wsReducer);

    const done = useMemo(() => orders.filter((item) => (item.status === 'done')), [orders]);
    const inWork = useMemo(() => orders.filter((item) => (item.status === 'pending' || item.status === 'created')), [orders]);

    useEffect(() => {
        dispatch(wsConnectionStart(WS_URL_ALL));
        return () => { dispatch({ type: WS_CONNECTION_END }) }
    }, [dispatch]);

    const filterOrders = (done: TOrderInfo[]) => {
        return done.slice(0, 10);
    };

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
                                {filterOrders(done).map((item) => (
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
