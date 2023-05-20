import { useState } from "react";
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useLocation, Navigate } from "react-router-dom"
import styles from './LoginPage.module.scss';
import { useDispatch, useSelector } from "react-redux";
import loginUserAction from "../../services/actions/loginUserAction";


const LoginPage = () => {
    const [inputInfo, setInputInfo] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const isAuth = useSelector((store) => store.authorizeReducer.isAuthorization);
    const location = useLocation();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            loginUserAction(inputInfo.email, inputInfo.password)
        )
    }
    if (isAuth) { return (<Navigate to={location.state?.from || '/'} />) }
    return (
        <section className={styles.login}>
            <form className={`${styles.login__form} mt-20 mb-20`} onSubmit={onSubmit}>
                <h2 className={`${styles.login__title} text text_type_main-medium mt-25`}>Вход</h2>
                <EmailInput
                    type='email'
                    placeholder='E-mail'
                    value={inputInfo.email}
                    name='email'
                    error={false}
                    errorText='Ошибка в E-mail'
                    size='default'
                    onChange={e => { setInputInfo({ ...inputInfo, [e.target.name]: e.target.value }) }}
                />
                <PasswordInput
                    name='password'
                    value={inputInfo.password}
                    onChange={e => { setInputInfo({ ...inputInfo, [e.target.name]: e.target.value }) }}
                />
                <Button size="medium" htmlType="submit" type="primary">Войти</Button>
            </form>
            <div className={`${styles.login__container}`}>
                <p className={`text text_type_main-default text_color_inactive mr-2`}>Вы — новый пользователь?</p>
                <div className={styles.login__link}>
                    <Link to='/register' className={`${styles.login__link} text text_type_main-default`}>Зарегистрироваться</Link>
                </div>
            </div>
            <div className={`${styles.login__container} mt-4`}>
                <p className={`text text_type_main-default text_color_inactive mr-2`}>Забыли пароль?</p>
                <div className={styles.login__link}>
                    <Link to='/forgot-password' className={`${styles.login__link} text text_type_main-default`}>Восстановить пароль</Link>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;
