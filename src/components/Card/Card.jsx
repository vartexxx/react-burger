import { useState, memo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import styles from './Card.module.scss';
import cardProp from "../../utils/propTypes";

const Card = memo(function Card(props){
    const [modal, modalSet] = useState(false);
    const openModal = () => modalSet(!modal);
    const closeModal = () => modalSet(!modal);
    return (
        <div className={`${styles.card} ml-4 mr-4`} onClick={openModal}>
            <img className={`${styles.card__image} pl-4 pr-4`} src={props.data.image} alt={props.data.name} />
            <div className={styles.card__price}>
                <p className="text text_type_digits-default mt-1 mb-1">{props.data.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default">{props.data.name}</p>
        
        {modal && (
            <Modal onClose={closeModal}>
                <IngredientDetails data={props.data} />
            </Modal>
        )}
        </div>
    );
});

Card.propTypes = {
    data: cardProp,
};

export default Card;
