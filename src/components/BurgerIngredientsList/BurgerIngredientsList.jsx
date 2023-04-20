import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import styles from './BurgerIngredientsList.module.scss';
import cardProp from '../../utils/propTypes';


const BurgerIngredientsList = forwardRef((props, ref) => {
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

BurgerIngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(cardProp),
};

export default BurgerIngredientsList;
