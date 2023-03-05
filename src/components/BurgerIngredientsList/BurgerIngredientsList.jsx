import React from 'react';
import Card from '../Card/Card';
import styles from './BurgerIngredientsList.module.scss';


const BurgerIngredientsList = React.forwardRef((props, ref) => {
    return (
        <>
            <p ref={ref} className='text text_type_main-medium pb-6'>{props.title}</p>
            <div className={styles.container}>
                {props.data.map((item) => {
                    return <Card key={item._id} data={item} />
                })}
            </div>
        </>
    )
});

export default BurgerIngredientsList;
