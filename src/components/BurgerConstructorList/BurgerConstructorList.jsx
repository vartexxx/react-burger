import { useDispatch } from "react-redux";
import { Reorder } from "framer-motion";
import { DELETE } from "../../services/actions/burgerConstructorAction";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cardProp from "../../utils/propTypes";


const BurgerConstructorList = ({list}) => {
  const dispatch = useDispatch();

  return (
    <Reorder.Item
      value={list}
    >
      <DragIcon />
      <ConstructorElement
        text={list.name}
        price={list.price}
        thumbnail={list.image}
        handleClose={() =>
          dispatch({ type: DELETE, payload: list })
        }
      />
    </Reorder.Item>
  )
};

BurgerConstructorList.propTypes = {
  list: cardProp
};

export default BurgerConstructorList;
