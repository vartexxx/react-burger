import { 
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './AppHeader.module.scss';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <nav className={"pt-4 pb-4 " + styles.header__menu}>
                    <ul className={styles.header__list}>
                        <li>
                            <a className={"pt-4 pr-5 pb-4 pl-5 " + styles.header__link} href="#">
                                <BurgerIcon type="primary" />
                                <span className="text text_type_main-default ml-2">Конструктор</span>
                            </a>
                        </li>
                        <li>
                            <a className={"pt-4 pr-5 pb-4 pl-5 ml-2 " + styles.header__link} href="#">
                                <ListIcon type="secondary"/>
                                <span style={{color: "#8585AD"}} className="text text_type_main-default ml-2">Лента заказов</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className={styles.header__logo}>
                                <Logo />
                            </a>
                        </li>
                        <li>
                            <a className={"pt-4 pr-5 pb-4 pl-5 " + styles.header__link} href="#">
                                <ProfileIcon type="secondary" />
                                <span style={{color: "#8585AD"}} className="text text_type_main-default ml-2">Личный кабинет</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};

export { AppHeader };