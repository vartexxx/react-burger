import { Link } from "react-router-dom"
import styles from './NotFoundPage.module.scss';


const NotFoundPage = () => {
    return (
        <div className={styles.nf__container}>
            <h2 className={`${styles.nf__title} text text_type_digits-large mt-25`}>ERROR 404</h2>
            <p className={`${styles.nf__text} text text_type_main-large mt-20`}>Запрашиваемая вами страница - не существует.</p>
            <div className={`${styles.nf__link} mt-20`}>
                <Link className={`${styles.nf__back} text text_type_main-large`} to='/' >Вернуться на главную страницу</Link>
            </div>
        </div>
    )
}

export default NotFoundPage;
