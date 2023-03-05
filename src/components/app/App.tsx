import { AppHeader } from '../app-header/AppHeader';
import { BurgerIngredients } from '../burger-ingredients/BurgerIngredients';
import { BurgerConstructor } from '../burger-constructor/BurgerConstructor';
import styles from './App.module.scss';

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;
