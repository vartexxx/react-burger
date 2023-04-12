import { useMemo, useState, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from '../BurgerIngredientsList/BurgerIngredientsList';
import styles from './BurgerIngredients.module.scss';
import { useInView } from "react-intersection-observer";
import { useSelector } from 'react-redux';


const BurgerIngredients = () => {
    const [bunRef, inViewBun] = useInView({ threshold: 0 });
    const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
    const [mainRef, inViewMain] = useInView({ threshold: 0 });

    const ingredients = useSelector(
        (store) => store.burgerIngredientsReducer.burgerIngredientsList
    );

    const { bun, sauce, main } = useMemo(() => {
        return ingredients.reduce((count, item) => {
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
    }, [ingredients]);

    const [current, setCurrent] = useState('bun');

    const scrollToTab = (id) => {
        setCurrent(id);
        document.querySelector(`#${id}`).scrollIntoView({behavior: 'smooth'});
    }

    useEffect(() => {
        if(inViewBun) {
            setCurrent('bun')
        } else if (inViewSauce) {
            setCurrent('sauce')
        } else {
            setCurrent('main')
        }
    }, [inViewBun, inViewSauce, inViewMain]);

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
                        ref={bunRef}
                    />
                    <BurgerIngredientsList
                        title='Соусы'
                        type='sauce'
                        data={sauce}
                        id='sauce'
                        ref={sauceRef}
                    />
                    <BurgerIngredientsList
                        title='Начинки'
                        type='main'
                        data={main}
                        id='main'
                        ref={mainRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default BurgerIngredients;
