import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from './ForgotPasswordPage.module.scss';
import { useDispatch, useSelector } from "react-redux";
import forgotPasswordAction from "../../services/actions/forgotPasswordAction";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const isAuth = useSelector((store) => store.authorizeReducer.isAuthorization);
    const forgotPasswordCodeSend = useSelector((store) => store.authorizeReducer.forgotPasswordCodeSend);
    const location = useLocation();
    const onSubmit = (e) => {
        e.preventDefault();
        if (email) { dispatch(forgotPasswordAction(email))}
    }
    if (isAuth) { return <Navigate to='/' />}
    if (forgotPasswordCodeSend) { return <Navigate to={'/reset-password'} state={{prevName: location.pathname}} />}
    return (
        <section className={styles.forgot}>
            <form className={`${styles.forgot__form} mt-20 mb-20`} onSubmit={onSubmit}>
                <h2 className={`${styles.forgot__title} text text_type_main-medium mt-25`}>Восстановление пароля</h2>
                <EmailInput
                    type='email'
                    placeholder='Укажите e-mail'
                    value={email}
                    name='email'
                    error={false}
                    errorText='Ошибка в E-mail'
                    size='default'
                    onChange={e => { setEmail(e.target.value) }}
                />
                <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
            </form>
            <div className={`${styles.forgot__container}`}>
                <p className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</p>
                <div className={styles.forgot__link}>
                    <Link to='/login' className={`${styles.forgot__link} text text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default ForgotPasswordPage;
