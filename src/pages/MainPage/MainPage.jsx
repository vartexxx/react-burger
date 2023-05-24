import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import Main from "../../components/Main/Main";
import Modal from '../../components/Modal/Modal';
import { RESET_INGREDIENT_INFO } from "../../services/actions/burgerCurrentIngredientAction";


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
    };

    return (
        <>
            <Main />
            {ingredient && (
                <Modal onCloseModal={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
        </>
    );
};

export default MainPage;
