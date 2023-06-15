import { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../services/types/hooks';
import MainPage from '../MainPage/MainPage';
import styles from './IngredientPage.module.scss';


const IngredientPage: FC = () => {
    const ingredients = useSelector(
        (store) => store.burgerIngredientsReducer.burgerIngredientsList
    );

    const location = useLocation();
    const { id } = useParams();

    const item = ingredients.find((item) => item._id === id);

    return location.state?.from === "/" ? (
        <MainPage />
    ) : (
            <>
                <div className={styles.container}>
                    <h2 className='text text_type_main-large'>Детали ингредиента</h2>
                    <div className='pl-5 pr-5'>
                        <img src={item?.image_large} alt={item?.name} />
                    </div>
                    <p className='text text_type_main-medium pt-4'>{item?.name}</p>
                    <div className={styles.colorizator + ' pt-8'}>
                        <div style={{ textAlign: 'center' }}>
                            <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
                            <p className='text text_type_digits-default text_color_inactive pt-2'>{item?.calories}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                            <p className='text text_type_digits-default text_color_inactive pt-2'>{item?.proteins}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                            <p className='text text_type_digits-default text_color_inactive pt-2'>{item?.fat}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                            <p className='text text_type_digits-default text_color_inactive pt-2'>{item?.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            </>
    );
};


export default IngredientPage;
