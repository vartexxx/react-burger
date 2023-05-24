import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from './AppHeader.module.scss';


const AppHeader = () => {
    const setActive = ({isActive}) => ({color: isActive ? '#f2f2f3' : ''})

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <nav className={`${styles.header__menu} pt-4 pb-4`}>
                    <ul className={styles.header__list}>
                        <li>
                            <Link to={'/'} className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5`} style={{setActive}}>
                                <BurgerIcon type="primary" />
                                <span className="text text_type_main-default ml-2">Конструктор</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/feed'} className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5 ml-2`} style={{setActive}}>
                                <ListIcon type="secondary"/>
                                <span style={{color: "#8585AD"}} className={`${styles.header__span} text text_type_main-default ml-2`}>Лента заказов</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className={styles.header__logo}>
                                <Logo />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/profile'} className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5`} style={{setActive}}>
                                <ProfileIcon type="secondary" />
                                <span className={`${styles.header__span} text text_type_main-default ml-2`}>Личный кабинет</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;
