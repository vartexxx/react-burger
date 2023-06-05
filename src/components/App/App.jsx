import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, createBrowserRouter } from 'react-router-dom';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import getIngredients from '../../services/actions/burgerIngredientsAction';
import getUserAction from '../../services/actions/getUserAction';
import { getCookie } from '../../utils/cookie';
import AppHeader from '../AppHeader/AppHeader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import FeedPage from '../../pages/FeedPage/FeedPage';
import OrderPage from '../../pages/OrderPage/OrderPage';
import AuthOrderFullWindow from '../AuthOrderFullWindow/AuthOrderFullWindow';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            dispatch(getUserAction())
        }
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/ingredients/:id' element={<IngredientPage />} exact={true}/>
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                <Route path='/reset-password' element={<ResetPasswordPage />} />
                <Route path='/profile/*' 
                    element={
                    <ProtectedRoute element={<ProfilePage />} />
                    }
                />
                <Route path='/profile/orders/:id'
                    element={
                        <ProtectedRoute element={<AuthOrderFullWindow />} />
                    }
                />
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/feed/:id' element={<OrderPage />} />
            </Routes>
        </> 
    );
};

export default App;
