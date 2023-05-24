import PropTypes from "prop-types";
import styles from './ModalOverlay.module.scss';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
};

ModalOverlay.propTypes = {
    onclose: PropTypes.func,
}

export default ModalOverlay;
