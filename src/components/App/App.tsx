import {useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from './App.module.scss';
import getApi from '../../utils/api.js';


function App() {
  const [state, setState] = useState([])
  useEffect(() => {
    getApi()
      .then((data) => setState(data.data))
      .catch((err) => console.log(err))
  }, []);
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state}/>
        <BurgerConstructor data={state}/>
      </main>
    </>
  );
};

export default App;
