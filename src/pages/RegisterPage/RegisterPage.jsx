import { Input, Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react"
import { Link } from "react-router-dom";
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
    const [inputInfo, setInputInfo] = useState({ name: '', email: '', password: '' });
    return (
        <section className={`${styles.register}`}>
            <form className={`${styles.register__form} mt-20 mb-20`}>
                <h2 className={`${styles.register__title} text text_type_main-medium mt-25`}>Регистрация</h2>
                <Input
                    type='text'
                    placeholder='Имя'
                    value={inputInfo.name}
                    name='name'
                    error={false}
                    errorText='Ошибка в имени'
                    size='default'
                    onChange={e => { setInputInfo({ ...inputInfo, [e.target.name]: e.target.value }) }}
                />
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
                <Button size="medium" htmlType="submit" type="primary">Зарегистрироваться</Button>
            </form>
            <div className={`${styles.register__container}`}>
                <p className={`text text_type_main-default text_color_inactive mr-2`}>Уже зарегистрированы?</p>
                <div className={`${styles.register__login}`}>
                    <Link className={`text text_type_main-default`} to='/login' >Войти</Link>
                </div>
            </div>
        </section>
    )
}


export default RegisterPage;