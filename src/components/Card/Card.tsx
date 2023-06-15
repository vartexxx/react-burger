import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useMemo } from "react";
import { useDrag } from "react-dnd";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SET_INGREDIENT_INFO, RESET_INGREDIENT_INFO } from "../../services/actions/burgerCurrentIngredientAction";
import styles from './Card.module.scss';
import { useState } from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { IIngredient } from "../../services/types/types";
import { FC } from "react";

interface ICard {
    ingredient: IIngredient
}

interface ICounters {
    [counters: string]: number;
}


const Card: FC<ICard> = memo(function Card({ ingredient }){
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { burgerConstructorIngredients, burgerIngredients } = useSelector((store) => ({
        burgerConstructorIngredients: store.burgerConstructorReducer,
        burgerIngredients: store.burgerIngredientsReducer,
    }));

    const counter = useMemo(() => {
        const counters: ICounters = {};
        burgerIngredients.burgerIngredientsList.forEach((ingredient: { _id: string | number; }) => {
            counters[ingredient._id] = burgerConstructorIngredients.burgerConstructorList.filter(
                (constructorItem: { _id: string | number; }) => constructorItem._id === ingredient._id).length;
        });
        if (burgerConstructorIngredients.burgerConstructorBun) {
            counters[burgerConstructorIngredients.burgerConstructorBun._id] = 2;
        }
        return counters;
    }, [burgerConstructorIngredients, burgerIngredients]);
    
    const getCounterInredient = (ingredientId: string) => counter[ingredientId];

    const [, dragRef, dragPreviewRef] = useDrag({
        type: "ingredients",
        item: ingredient,
    });

    const openModal = () => {
        dispatch({ type: SET_INGREDIENT_INFO, payload: ingredient });
        setIsOpen(true);
        window.history.pushState({ path: `/ingredients/${ingredient._id}` }, '', `/ingredients/${ingredient._id}`)
    };
    
    const closeModal = () => {
        dispatch({ type: RESET_INGREDIENT_INFO });
        window.history.pushState({ path: `/` }, '', `/`)
    }

    return (
        <>
            <div ref={dragRef} className={`${styles.card} ml-4 mr-4`} onClick={openModal}>
                {getCounterInredient(ingredient._id) !== 0 && (
                    <Counter count={getCounterInredient(ingredient._id)} size="default" />
                )}
                <Link
                    to={`/ingredients/${ingredient._id}`}
                    className={`text_color_primary ${styles.card__link}`}
                    state={{ from: "/" }}
                >
                    <img ref={dragPreviewRef} className={`pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
                    <div className={styles.card__price}>
                        <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price}</p>
                        <CurrencyIcon type={"primary"} />
                    </div>
                    <p className="text text_type_main-default">{ingredient.name}</p>
                </Link>
            </div>
            {isOpen &&
            <Modal setActive={setIsOpen} onClose={closeModal} header={'Детали ингредиента'}>
                <IngredientDetails />
            </Modal>
            }
        </>

    );
});

export default Card;
