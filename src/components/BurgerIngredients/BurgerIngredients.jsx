import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';
import styles from './BurgerIngredients.module.scss';
import data from '../../utils/data';


function BurgerIngredients() {

    const { bun, sauce, main } = React.useMemo(() => {
        return data.reduce((count, item) => {
            if(item.type === 'bun') {
                count.bun.push(item);
            }
            else if(item.type === 'sauce') {
                count.sauce.push(item);
            }
            else if(item.type === 'main') {
                count.main.push(item);
            }
            console.log(count);
            return count;
        }, {bun: [], sauce: [], main: [] }
        )
    });
    const [current, setCurrent] = React.useState('bun');

    return (
        <section className={styles.ingredients} >
            <div className={styles.ingredients__container}>
                <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
                <div className={styles.ingredients__choice}>
                    <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value='main' active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.ingredients__cases}>
                    <BurgerIngredientsList  
                        title='Булки'
                        type='bun'
                        data={bun}
                    />
                    <BurgerIngredientsList
                        title='Соусы'
                        type='sauce'
                        data={sauce}
                    />
                    <BurgerIngredientsList 
                        title='Начинки'
                        type='main'
                        data={main}
                    />
                </div>
            </div>
        </section>
    )
};

export { BurgerIngredients };
