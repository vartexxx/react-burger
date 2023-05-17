import styles from './ModalOverlay.module.scss';
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
};

ModalOverlay.propTypes = {
    onclose: PropTypes.func,
}

export default ModalOverlay;
