import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import forgotPasswordAction from "../../services/actions/forgotPasswordAction";
import { useDispatch, useSelector } from "../../services/types/hooks";
import styles from './ForgotPasswordPage.module.scss';


const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { isAuthorization, forgotPasswordCodeSend } = useSelector((store) => store.authorizeReducer);
    const location = useLocation();
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (email) { dispatch(forgotPasswordAction(email))}
    };
    if (isAuthorization) { return <Navigate to='/' /> };
    if (forgotPasswordCodeSend) { return <Navigate to={'/reset-password'} state={{prevName: location.pathname}} />};
    return (
        <section className={styles.forgot}>
            <form className={`${styles.forgot__form} mt-20 mb-20`} onSubmit={onSubmit}>
                <h2 className={`${styles.forgot__title} text text_type_main-medium mt-25`}>Восстановление пароля</h2>
                <EmailInput
                    placeholder='Укажите e-mail'
                    value={email}
                    name='email'
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
    );
};


export default ForgotPasswordPage;
