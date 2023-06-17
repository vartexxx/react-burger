import { FC, useMemo, useState } from 'react';
import IngredientDetails from '../../../../components/IngredientDetails/IngredientDetails';
import Modal from '../../../../components/Modal/Modal';
import { RESET_INGREDIENT_INFO, SET_INGREDIENT_INFO } from '../../../../services/actions/burgerCurrentIngredientAction';
import { useDispatch, useSelector } from '../../../../services/types/hooks';
import styles from './FeedIcons.module.scss';


type TFeedIcons = {
    id: string,
    count: number,
    index: number,
};

const FeedIcons: FC<TFeedIcons> = ({ id, count, index }) => {
    const dispatch = useDispatch();

    const ingredients = useSelector(state => state.burgerIngredientsReducer.burgerIngredientsList);
    const [isOpen, setIsOpen] = useState(false);
    const ingredient = useMemo(() => ingredients.find((item) => (item._id === id)), [ingredients, id]);

    const onClick = () => {
        dispatch({ type: SET_INGREDIENT_INFO, payload: ingredient });
        setIsOpen(true);
        window.history.pushState({ path: `/ingredients/${ingredient!._id}` }, '', `/ingredients/${ingredient!._id}`)
    };
    const onClose = () => {
        dispatch({ type: RESET_INGREDIENT_INFO });
        window.history.pushState({ path: `/feed` }, '', `/feed`)
    };

    return (
        <>
            {count > 0 && index === 5 &&
                <div className={styles.icons__imagecontainer} style={{zIndex: `${6 - index}`}} onClick={onClick}>
                    <img className={styles.icons__image} style={{opacity: 0.6}} src={ingredient?.image_mobile} alt={ingredient?.name} />
                    <span className={'text text_type_main-default ' + styles.icons__count}>{`${count}`}</span>
                </div>
            }
            {count === 0 && index === 5 &&
                <div className={styles.icons__imagecontainer} style={{ zIndex: `${6 - index}` }} onClick={onClick}>
                    <img className={styles.icons__image} src={ingredient?.image_mobile} alt={ingredient?.name} />
                </div>
            }
            {index < 5 &&
                <div className={styles.icons__imagecontainer} style={{ zIndex: `${6 - index}` }} onClick={onClick}>
                    <img className={styles.icons__image} src={ingredient?.image_mobile} alt={ingredient?.name} />
                </div>
            }
            {isOpen &&
                <Modal setActive={setIsOpen} onClose={onClose} header={'Детали ингредиента'}>
                    <IngredientDetails />
                </Modal>
            }
        </>
    )
};


export default FeedIcons;
