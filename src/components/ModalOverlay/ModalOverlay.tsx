import styles from './ModalOverlay.module.scss';
import { FC } from 'react';


type TModalOverlay = {
    animation: boolean,
    closeModalAnimation: () => void
}

const ModalOverlay: FC<TModalOverlay> = ({ animation, closeModalAnimation }) => {
    return (
        <div className={animation ? `${styles.modal__overlay} ${styles.modal__active}` : `${styles.modal__overlay}`} onClick={() => closeModalAnimation()}></div>
    )
};

export default ModalOverlay;
