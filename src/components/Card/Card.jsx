import { useState, memo, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from './Card.module.scss';
import cardProp from "../../utils/propTypes";
import { SET_INGREDIENT_INFO } from "../../services/actions/burgerCurrentIngredientAction";
import { useSelector } from "react-redux";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
const Card = memo(function Card({ingredient}){
    
    const burgerConstructorIngredients = useSelector(
        (store) => store.burgerConstructorReducer
      );
    
      const burgerIngredients = useSelector(
        (store) => store.burgerIngredientsReducer
      );
    
      const counter = useMemo(() => {
        const counters = {};
        burgerIngredients.burgerIngredientsList.forEach((ingredient) => {
          counters[ingredient._id] =
            burgerConstructorIngredients.burgerConstructorList.filter(
              (constructorItem) => constructorItem._id === ingredient._id
            ).length;
        });
        if (burgerConstructorIngredients.burgerConstructorBun) {
          counters[
            burgerConstructorIngredients.burgerConstructorBun._id
          ] = 2;
        }
        return counters;
      }, [burgerConstructorIngredients, burgerIngredients]);
    
      const getCounterInredient = (ingredientId) => counter[ingredientId];
    
      const dispatch = useDispatch();
    
      const [, dragRef, dragPreviewRef] = useDrag({
        type: "ingredients",
        item: ingredient,
      });
      function openModal() {
        dispatch({ type: SET_INGREDIENT_INFO, payload: ingredient });
      }      
    return (
        <div ref={dragRef} className={`${styles.card} ml-4 mr-4`} onClick={openModal}>
              {getCounterInredient(ingredient._id) !== 0 && (
        <Counter count={getCounterInredient(ingredient._id)} size="default" />
      )}
            <img ref={dragPreviewRef} className={`${styles.card__image} pl-4 pr-4`} src={ingredient.image} alt={ingredient.name} />
            <div className={styles.card__price}>
                <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        
        {/* {modal && (
            <Modal onClose={closeModal}>
                <IngredientDetails data={props.data} />
            </Modal>
        )} */}
        </div>
    );
});
export default Card;
