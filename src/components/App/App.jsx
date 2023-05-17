import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import getIngredients from '../../services/actions/burgerIngredientsAction';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
