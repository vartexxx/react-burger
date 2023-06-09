import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import Modal from "../../../components/Modal/Modal";
import OrderFullWindow from "../../../components/OrderFullWindow/OrderFullWindow";
import { GET_CURRENT_ORDER_INFO, REMOVE_CURRENT_ORDER_INFO } from "../../../services/actions/orderCurrentAction";
import FeedIcons from "./FeedIcons/FeedIcons";
import styles from './FeedOrderCard.module.scss';


const FeedOrderCard = ({ order, onStatus, pathOrder }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.burgerIngredientsReducer.burgerIngredientsList);
    const [isOpen, setIsOpen] = useState(false);
    const onClick = () => {
        dispatch({ type: GET_CURRENT_ORDER_INFO, order });
        setIsOpen(true);
        window.history.pushState({ path: `${pathOrder}/${order._id}` }, '', `${pathOrder}/${order._id}`)
    };
    const onClose = () => {
        dispatch({ type: REMOVE_CURRENT_ORDER_INFO });
        window.history.pushState({ path: `${pathOrder}` }, '', `${pathOrder}`)
    }
    const ingredientsList = useMemo(() => Array.from(new Set(order.ingredients)), [order])
    const ingredientsMap = useMemo(() => ingredientsList.slice(0, 6), [ingredientsList]);
    const count = useMemo(() => ingredientsList.length > 6 ? (ingredientsList.length - 6) : 0, [ingredientsList]);
    const cost = useMemo(() => {
        let total = 0;
        order.ingredients.forEach((id) => {
            const ingredient = ingredients.find((item) => (item._id === id));
                total += ingredient?.price;
        });
        return total
    }, [ingredients, order]);
  
    const status = order.status === 'done' ? 'Выполнен' : order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : '';

    return (
        <>
            <div className={styles.order}>
                <div className='pb-6' onClick={onClick}>
                    <div className={styles.header}>
                        <p className='text text_type_digits-default' >{`#${order.number}`}</p>
                        <p className='text text_type_main-default text_color_inactive'><FormattedDate date={new Date(order.createdAt)} /></p>
                    </div>
                    <p className='text text_type_main-medium pt-6 pl-6 pr-6'>{order.name}</p>
                    {onStatus &&
                        <p className='text text_type_main-default pt-2 pl-6'>{status}</p>
                    }
                </div>
                <div className={styles.images_and_cost}>
                    <div className={styles.image_box}>
                        {
                            ingredientsMap.map((ingredientId, index) => (
                            <FeedIcons key={uuidv4()} id={ingredientId} count={count} index={index} />
                            ))
                        }
                    </div>
                    <div className={styles.cost} onClick={onClick}>
                        <p className='text text_type_digits-default'>{`${cost}`}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            { isOpen &&
                <Modal setActive={setIsOpen} header={`#${order.number}`} onClose={onClose}>
                    <OrderFullWindow />
                </Modal>
            }
        </>
    )
};

FeedOrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    pathOrder: PropTypes.string.isRequired,
    onStatus: PropTypes.bool,
};

export default FeedOrderCard;
