import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from './Modal.module.scss';


const modalRoot = document.querySelector('#modal');

const Modal = ({ setActive, onClose, header, children }) => {
    const [animation, setAnimation] = useState(true);

    const closeModalAnimation = () => {
        const closeModal = () => {
            setActive(false);
        };
        setAnimation(false);
        setTimeout(() => {
            closeModal();
            setTimeout(onClose, 1)
        }, 400);
    }
    useEffect(() => {
        const handleCloseEsc = (evt) => {
            if (evt.key === 'Escape') {
                closeModalAnimation()
            }
        }
        document.addEventListener('keydown', handleCloseEsc)
        return () => document.removeEventListener('keydown', handleCloseEsc)
    })

    return createPortal(
        <>
            <ModalOverlay animation={animation} closeModalAnimation={closeModalAnimation} />
            <div className={animation ? `${styles.modal} ${styles.modal__active}` : `${styles.modal}`}>
                <div className={animation ? `${styles.modal__content} ${styles.modal__contentactive}` : `${styles.modal__content}`} onClick={(evt) => evt.stopPropagation()}>
                    <div className={styles.modal__container + ' pt-10 pl-10 pr-10'}>
                        <p className={'text text_type_main-large'}>{header}</p>
                        <div className={styles.modal__button} onClick={closeModalAnimation}>
                            <CloseIcon type='primary' />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>, modalRoot
    );
};

export default Modal;
