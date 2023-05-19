import Main from "../../components/Main/Main";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Modal from '../../components/Modal/Modal';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET_INGREDIENT_INFO } from "../../services/actions/burgerCurrentIngredientAction";
import { useSelector } from "react-redux";


const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredient = useSelector(
        (store) => store.burgerCurrentIngredientReducer.currentIngredient
    );
    function closeModal(e) {
        e.stopPropagation();
        dispatch({ type: RESET_INGREDIENT_INFO });
        navigate("/");
    }
    return (
        <>
            <Main />
            {ingredient && (
                <Modal onCloseModal={closeModal}>
                    <IngredientDetails />
                </Modal>
            )}
        </>
    )
}

export default MainPage;
