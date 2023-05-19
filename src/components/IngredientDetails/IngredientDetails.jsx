import { useSelector } from 'react-redux';
import styles from './IngredientDetails.module.scss';


const IngredientDetails = () => {
    const ingredient = useSelector((store) => store.burgerCurrentIngredientReducer.currentIngredient)
    return (
        <>
            <p className={`${styles.details__title} ml-10 mt-10 text text_type_main-large`}>Детали ингредиента</p>
            <img src={ingredient.image_large} alt={ingredient.name}/>
            <p className={`mt-4 text text_type_main-medium`}>{ingredient.name}</p>
            <ul className={`${styles.details__container} mt-8 `} style={{color: "#8585AD"}}>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default mt-2">{ingredient.calories}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default mt-2">{ingredient.proteins}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default mt-2">{ingredient.fat}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default mt-2">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </>
    );
};


export default IngredientDetails;
