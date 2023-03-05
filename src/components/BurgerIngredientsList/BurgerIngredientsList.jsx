import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../Card/Card';
import styles from './BurgerIngredientsList.module.scss';


const BurgerIngredientsList = React.forwardRef((props, ref) => {
    return (
        <>
            <p id={props.id} ref={ref} className='text text_type_main-medium pt-10 pb-6'>{props.title}</p>
            <div className={styles.container}>
                {props.data.map((item) => {
                    return <Card key={item._id} data={item} />
                })}
            </div>
        </>
    )
});

BurgerIngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default BurgerIngredientsList;
