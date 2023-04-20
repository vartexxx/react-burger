import {
    ADD,
    DELETE,
    SORT,
  } from "../actions/burgerConstructorAction";
  
  const constructorInitialState = {
    burgerConstructorBunElement: undefined,
    burgerConstructorFillingList: [],
  };
  
  export default function burgerConstructorReducer(
    state = constructorInitialState,
    action
  ) {
    switch (action.type) {
      case ADD:
        if (action.payload.type === "bun") {
          return {
            ...state,
            burgerConstructorBunElement: action.payload,
          };
        }
  
        return {
          ...state,
          burgerConstructorFillingList: [
            ...state.burgerConstructorFillingList,
            { constructorItemId: action.id, ...action.payload },
          ],
        };
  
      case DELETE:
        return {
          ...state,
          burgerConstructorFillingList: state.burgerConstructorFillingList.filter(
            (item) => item.constructorItemId !== action.payload.constructorItemId
          ),
        };
  
      case SORT:
        return {
            ...state,
            burgerConstructorFillingList: action.payload,
          };
      default:
        return state;
    }
  }