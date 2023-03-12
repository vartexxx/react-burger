import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from './Modal.module.scss';

const modalRoot = document.querySelector('#modal');

const Modal = ({onClose, children}) => {
    const handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleEscClose)
    });
    return createPortal(
        <>
            <div className={`${styles.modal__container} pb-15`}>
                <button type='button' className={styles.modal__button} onClick={onClose}>
                    <CloseIcon />
                </button>
                {children}
            </div>
            <ModalOverlay onClose={onClose} />
        </>, modalRoot
    );
};

export default Modal;