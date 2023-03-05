import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Card.module.scss';
import { cardProp } from "../../utils/propTypes";

function Card({ data }) {
    return (
        <div className={`${styles.card} ml-4 mr-4`}>
            <img className={`${styles.card__image} pl-4 pr-4`} src={data.image} alt={data.name} />
            <div className={styles.card__price}>
                <p className="text text_type_digits-default mt-1 mb-1">{data.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text text_type_main-default">{data.name}</p>
        </div>
    )
};

Card.propTypes = {
    data: cardProp,
};

export { Card };
