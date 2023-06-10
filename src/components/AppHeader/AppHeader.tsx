import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from './AppHeader.module.scss';


const AppHeader: FC = () => {
    const { pathname } = useLocation();
    const active = {
        color: '#F2F2F3'
    };
    const toggleIcon = useCallback((url: string) => {
        if (pathname === "/" && url === "/") {
            return "primary";
        } else if (pathname.includes(url) && url !== "/") {
            return "primary";
        } else {
            return "secondary"
        }
    }, [pathname]);


    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <nav className={`${styles.header__menu} pt-4 pb-4`}>
                    <ul className={styles.header__list}>
                        <li>
                            <NavLink to={'/'} className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5 text text_type_main-default`} style={({ isActive }) => (isActive ? active : undefined)}>
                                <BurgerIcon type={toggleIcon('/')} />
                                Конструктор
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/feed'} className={`${styles.header__link} text text_type_main-default pt-4 pr-5 pb-4 pl-5 ml-2`} style={({ isActive }) => (isActive ? active : undefined)}>
                                <ListIcon type={toggleIcon('/feed')}/>
                                Лента заказов
                            </NavLink>
                        </li>
                        <li>
                            <Link to={'/'} className={styles.header__logo}>
                                <Logo />
                            </Link>
                        </li>
                        <li>
                            <NavLink to={'/profile'} className={`${styles.header__link} text text_type_main-default pt-4 pr-5 pb-4 pl-5`} style={({ isActive }) => (isActive ? active : undefined)}>
                                <ProfileIcon type={toggleIcon('/profile')} />
                                Личный кабинет
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
