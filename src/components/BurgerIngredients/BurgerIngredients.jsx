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
            return count;
        }, {bun: [], sauce: [], main: [] }
        )
    });
    const [current, setCurrent] = React.useState('bun');
    const scrollToTab = (data) => {
        setCurrent(data);
        document.querySelector(`#${data}`).scrollIntoView({behavior: 'smooth'});
    }

    return (
        <section className={styles.ingredients} >
            <div className={styles.ingredients__container}>
                <h1 className='text text_type_main-large pt-10 pb-5'>Соберите бургер</h1>
                <div className={styles.ingredients__choice}>
                    <Tab value='bun' active={current === 'bun'} onClick={scrollToTab}>
                        Булки
                    </Tab>
                    <Tab value='sauce' active={current === 'sauce'} onClick={scrollToTab}>
                        Соусы
                    </Tab>
                    <Tab value='main' active={current === 'main'} onClick={scrollToTab}>
                        Начинки
                    </Tab>
                </div>
                <div className={styles.ingredients__cases}>
                    <BurgerIngredientsList
                        title='Булки'
                        type='bun'
                        data={bun}
                        id='bun'
                    />
                    <BurgerIngredientsList
                        title='Соусы'
                        type='sauce'
                        data={sauce}
                        id='sauce'
                    />
                    <BurgerIngredientsList
                        title='Начинки'
                        type='main'
                        data={main}
                        id='main'
                    />
                </div>
            </div>
        </section>
    )
};

export { BurgerIngredients };
