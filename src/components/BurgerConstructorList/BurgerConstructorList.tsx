import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Reorder } from "framer-motion";
import { DELETE } from "../../services/actions/burgerConstructorAction";
import { useDispatch } from "../../services/types/hooks";
import { IIngredient } from "../../services/types/types";
import { FC } from "react";

interface IBurgerConstructorList {
    list: IIngredient,
};

const BurgerConstructorList: FC<IBurgerConstructorList> = ({list , }) => {
    const dispatch = useDispatch();

    return (
        <Reorder.Item
            value={list}
        >
            <DragIcon type={"primary"} />
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


export default BurgerConstructorList;
