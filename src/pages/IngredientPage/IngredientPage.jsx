import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import styles from './IngredientPage.module.scss';


const IngredientPage = () => {
    const ingredients = useSelector(
        (store) => store.burgerIngredientsReducer.burgerIngredientsList
    );

    const location = useLocation();
    const { id } = useParams();

    const item = ingredients.find((item) => item._id === id)

    return location.state?.from === "/" ? (
        <MainPage />
    ) : (
        item && (
            <>
                <main className={styles.ingredient}>
                    <div className={styles.ingredient__container}>
                        <IngredientDetails
                        ingredient={item}
                        />
                    </div>
                </main>
            </>
        )
    )
}

export default IngredientPage;
