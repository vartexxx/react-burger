import { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import styles from './IngredientDetails.module.scss';


const IngredientDetails: FC = () => {
    const { currentIngredient } = useSelector((store) => store.burgerCurrentIngredientReducer);
    return (
        <div className={`${styles.details} pb-15 pl-10 pr-10`}>
        <img className={`${styles.details__image}`} src={currentIngredient?.image_large} alt={currentIngredient?.name}/>
            <p className={`${styles.details__text} mt-4 text text_type_main-medium`}>{currentIngredient?.name}</p>
            <ul className={`${styles.details__container} mt-8 `} style={{color: "#8585AD"}}>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient?.calories}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient?.proteins}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient?.fat}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default mt-2">{currentIngredient?.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
};


export default IngredientDetails;
