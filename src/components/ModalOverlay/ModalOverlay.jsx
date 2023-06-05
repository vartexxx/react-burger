import styles from './ModalOverlay.module.scss';

const ModalOverlay = ({ animation, closeModalAnimation }) => {
    return (
        <div className={animation ? `${styles.modal__overlay} ${styles.modal__active}` : `${styles.modal__overlay}`} onClick={() => closeModalAnimation()}></div>
    )
};

export default ModalOverlay;
