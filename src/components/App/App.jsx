import { useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.scss';
import getIngredients from '../../services/actions/burgerIngredientsAction';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
    </>
  );
};

export default App;
