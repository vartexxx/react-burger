import { forwardRef } from 'react';
import Card from '../Card/Card';
import styles from './BurgerIngredientsList.module.scss';
import { IIngredient } from '../../services/types/types';

interface IBurgerIngredientsList {
    title: string;
    id: string;
    type: string;
    data: Array<IIngredient>;
}
type ref = HTMLParagraphElement;


const BurgerIngredientsList = forwardRef<ref, IBurgerIngredientsList>((props, ref) => {
    return (
        <>
            <p id={props.id} ref={ref} className='text text_type_main-medium pt-10 pb-6'>{props.title}</p>
            <div className={styles.burger__container}>
                {props.data.map((item) => {
                    return <Card key={item._id} ingredient={item} />
                })}
            </div>
        </>
    );
});

export default BurgerIngredientsList;
