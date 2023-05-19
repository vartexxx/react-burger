import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './ResetPasswordPage.module.scss';


const ResetPasswordPage = () => {
    const [inputInfo, setInputInfo] = useState({ password: '', code: '' });
    return (
        <section className={styles.reset}>
            <form className={`${styles.reset__form} mt-20 mb-20`}>
                <h2 className={`${styles.reset__title} text text_type_main-medium mt-25`}>Восстановление пароля</h2>
                <PasswordInput
                    name='password'
                    placeholder='Введите новый пароль'
                    value={inputInfo.password}
                    onChange={e => { setInputInfo({ ...inputInfo, [e.target.name]: e.target.value }) }}
                />
                <Input
                    type='text'
                    placeholder='Введите код из письма'
                    value={inputInfo.code}
                    name='code'
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    onChange={e => { setInputInfo({ ...inputInfo, [e.target.name]: e.target.value }) }}
                />
                <Button htmlType="submit" type="primary" size="medium">Восстановить</Button>
            </form>
            <div className={`${styles.reset__container}`}>
                <p className={`text text_type_main-default text_color_inactive mr-2`}>Вспомнили пароль?</p>
                <div className={styles.reset__link}>
                    <Link to='/login' className={`${styles.reset__link} text text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </section>
    )
}

export default ResetPasswordPage;
