import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import logoutUserAction from "../../services/actions/logoutUserAction";
import updateUserAction from "../../services/actions/updateUserAction";
import { WS_CONNECTION_ORDERS_END, wsOrderConnectionStart } from "../../services/actions/wsActions";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { WS_URL_ALL } from "../../utils/variables";
import FeedOrderCard from "../FeedPage/FeedOrderCard/FeedOrderCard";
import styles from './ProfilePage.module.scss';


const ProfilePage: FC = () => {
    let {'*': path} = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const { user }: {user: {
        name: string,
        email: string
    }} = useSelector((store) => store.authorizeReducer);
    const orders = useSelector(state => state.wsReducerForOrders.orders);

    const password = '';
    const profile = {...user,  password}

    const [userData, setUserDate] = useState(profile);
    const [iconInfo, setIconInfo] = useState({ name: false, email: false, password: false});
    const [activeButtons, setActiveButtons] = useState(false);

    const onFormReset = () => {
        setUserDate({ name: user.name, email: user.email, password: ''})
    };

    const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserDate({...userData, [e.target.name]: e.target.value })
        setActiveButtons(true)
    };

    const profileFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(
            updateUserAction(userData)
        );
        setActiveButtons(false)
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


    useEffect(() => {
        if(location.pathname === '/profile/orders') {
            dispatch(wsOrderConnectionStart(WS_URL_ALL))
        }
        return () => {
            dispatch({ type: WS_CONNECTION_ORDERS_END })
        }
    }, [dispatch, location.pathname])

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
                                to={'/login'}
                                onClick={() =>
                                    (logoutUser())
                                }
                                className={`text text_type_main-medium text_color_inactive ${styles.profile__link}`}
                            >
                                Выход
                            </NavLink>
                        </nav>
                        <p className={`text text_type_main-default ${styles.profile__text}`}>В этом разделе вы можете изменить&nbsp; свои персональные данные</p>
                    </div>
                    {path === 'orders' ? (
                        <div className={styles.order}>
                            {orders.map((item) => (
                                <FeedOrderCard order={item} key={uuidv4()} onStatus={true} pathOrder={'/profile/orders'} />
                            ))}
                        </div>
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
                            {activeButtons && 
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
                            }
                        </form>
                    )}
                </div>
            </section>
        </>
    );
};


export default ProfilePage;
