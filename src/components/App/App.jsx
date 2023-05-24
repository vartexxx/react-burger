import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import getIngredients from '../../services/actions/burgerIngredientsAction';
import { getCookie } from '../../utils/cookie';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  // useEffect(() => {
  //   const accessToken = getCookie('token');
  //   console.log(accessToken)
  //   if (accessToken) {
  //     dispatch(getUserAction())
  //   }
  // }, [])
  

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route path='/profile/*' element={
          <ProtectedRoute element={<ProfilePage />} />
        } />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
