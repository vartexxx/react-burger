import { useDispatch } from "react-redux";
import styles from './BurgerConstructorList.module.scss'
import { Reorder } from "framer-motion";
import { DELETE } from "../../services/actions/burgerConstructorAction";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerConstructorList({filling}) {
  const dispatch = useDispatch()
  return (
    <Reorder.Item
      value={filling}
      className={styles.element} //Задать стиль
    >
      <DragIcon />
      <ConstructorElement
        text={filling.name}
        price={filling.price}
        thumbnail={filling.image}
        handleClose={() =>
          dispatch({ type: DELETE, payload: filling })
        }
      />
    </Reorder.Item>
  )
}
