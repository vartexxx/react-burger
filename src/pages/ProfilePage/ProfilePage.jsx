import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { changeUserData } from "../../utils/api";
import styles from './ProfilePage.module.scss';
import logoutUserAction from "../../services/actions/logoutUserAction";


const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useSelector((store) => store.authorizeReducer);

    const [userData, setUserDate] = useState(user);
    const [inputInfo, setInputInfo] = useState({ name: '', email: ''});

    const onFormReset = () => {
        setUserDate({ name: user.name, email: user.email})
    };

    const onFormChange = (e) => {
        setUserDate({...userData, [e.target.name]: e.target.value })
    };

    const profileFormSubmit = (e) => {
        e.preventDefault();
        dispatch(
            changeUserData(userData)
        );
    };

    const logoutUser = () => {
        dispatch(logoutUserAction());
    }

    const checkButton = () => {
        return JSON.stringify(user) === JSON.stringify(userData)
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
                                    dispatch(logoutUser(() => navigate('/login')))
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
                                disabled={inputInfo.name ? false : true}
                                onChange={onFormChange}
                                onIconClick={() => setInputInfo({ ...inputInfo, name: !inputInfo.name })}
                                icon="EditIcon"
                                placeholder="Имя"
                                name="name"
                            />
                            <Input
                                value={userData.email}
                                disabled={inputInfo.email ? false : true}
                                onChange={onFormChange}
                                onIconClick={() => setInputInfo({ ...inputInfo, email: !inputInfo.email })}
                                icon="EditIcon"
                                placeholder="Логин"
                                name="email"
                            />
                            <Input
                                icon="EditIcon"
                                placeholder="Пароль"
                                value="*********"
                                disabled
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
