import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logoutUserAction from "../../services/actions/logoutUserAction";
import updateUserAction from "../../services/actions/updateUserAction";
import styles from './ProfilePage.module.scss';


const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((store) => store.authorizeReducer);
    const password = '';
    const profile = {...user,  password}
    const [userData, setUserDate] = useState(profile);
    const [iconInfo, setIconInfo] = useState({ name: '', email: '', password: ''});

    const onFormReset = () => {
        setUserDate({ name: user.name, email: user.email, password: ''})
    };

    const onFormChange = (e) => {
        setUserDate({...userData, [e.target.name]: e.target.value })
    };

    const profileFormSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateUserAction(userData)
        );
    };

    const logoutUser = () => {
        dispatch(logoutUserAction());
    }

    const checkButton = () => {
        return JSON.stringify(profile) === JSON.stringify(userData)
    };

    const activeStyle = {
        color: "#f2f2f3",
    };

    return (
        <>
            <section className={`mt-30`}>
                <div className={styles.profile__container}>
                    <div className={styles.profile__navigation}>
                        <nav className={styles.profile__navlink}>
                            <NavLink
                                to="/profile"
                                className={`text text_type_main-medium text_color_inactive ${styles.profile__link}`}
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                                end
                            >
                                Профиль
                            </NavLink>
                            <NavLink
                                to="/profile/orders"
                                className={`text text_type_main-medium text_color_inactive ${styles.profile__link}`}
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                История заказов
                            </NavLink>
                            <NavLink
                                onClick={() =>
                                    (logoutUser(() => navigate('/login')))
                                }
                                className={`text text_type_main-medium text_color_inactive ${styles.profile__link}`}
                            >
                                Выход
                            </NavLink>
                        </nav>
                        <p className={`text text_type_main-default ${styles.profile__text}`}>В этом разделе вы можете изменить&nbsp; свои персональные данные</p>
                    </div>
                    {location.state ? (
                        <Outlet />
                    ) : (
                        <form className={styles.profile__form} onSubmit={profileFormSubmit}>
                            <Input
                                value={userData.name}
                                disabled={iconInfo.name ? false : true}
                                onChange={onFormChange}
                                onIconClick={() => setIconInfo({ ...iconInfo, name: !iconInfo.name })}
                                icon="EditIcon"
                                placeholder="Имя"
                                name="name"
                            />
                            <Input
                                value={userData.email}
                                disabled={iconInfo.email ? false : true}
                                onChange={onFormChange}
                                onIconClick={() => setIconInfo({ ...iconInfo, email: !iconInfo.email })}
                                icon="EditIcon"
                                placeholder="Логин"
                                name="email"
                            />
                            <Input
                                value={userData.password}
                                disabled={iconInfo.password ? false : true}
                                onChange={onFormChange}
                                onIconClick={() => setIconInfo({...iconInfo, password: !iconInfo.password})}
                                type={'password'}
                                icon="EditIcon"
                                placeholder="Пароль"
                                name="password"
                            />
                            <div className={styles.profile__buttons}>
                                <Button
                                    onClick={onFormReset}
                                    disabled={checkButton() ? true : false}
                                    type="secondary"
                                    size="medium"
                                    htmlType="button"
                                >
                                    Отмена
                                </Button>
                                <Button
                                    disabled={checkButton() ? true : false}
                                    type="primary"
                                    size="medium"
                                    htmlType="submit"
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
