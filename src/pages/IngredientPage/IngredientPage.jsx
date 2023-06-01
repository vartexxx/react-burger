import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import MainPage from '../MainPage/MainPage';
import styles from './IngredientPage.module.scss';


const IngredientPage = () => {
    const ingredients = useSelector(
        (store) => store.burgerIngredientsReducer.burgerIngredientsList
    );

    const location = useLocation();
    const { id } = useParams();

    const item = ingredients.find((item) => item._id === id);

    return location.state?.from === "/" ? (
        <MainPage />
    ) : (
        item && (
            <>
                <main className={styles.ingredient}>
                    <div className={`${styles.ingredient__container} mt-20`}>
                        <IngredientDetails
                            ingredient={item}
                        />
                    </div>
                </main>
            </>
        )
    );
};

export default IngredientPage;
