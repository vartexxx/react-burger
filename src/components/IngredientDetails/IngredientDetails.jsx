import styles from './IngredientDetails.module.scss';

export default function IngredientDetails({ data }) {
    return (
        <>
            <p className={`${styles.details__title} ml-10 mt-10 text text_type_main-large`}>Детали ингредиента</p>
            <img className src={data.image_large} alt={data.name}/>
            <p className={`mt-4 text text_type_main-medium`}>{data.name}</p>
            <ul className={`${styles.details__container} mt-8 `} style={{color: "#8585AD"}}>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Калории,ккал</p>
                    <p className="text text_type_digits-default mt-2">{data.calories}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default mt-2">{data.proteins}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default mt-2">{data.fat}</p>
                </li>
                <li className={styles.details__card}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default mt-2">{data.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}