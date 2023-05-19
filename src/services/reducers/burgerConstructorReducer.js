import { ADD, DELETE, SORT } from "../actions/burgerConstructorAction";


const constructorInitialState = {
  burgerConstructorBun: undefined,
  burgerConstructorList: [],
};

const burgerConstructorReducer = ( state = constructorInitialState, action ) => {
  switch (action.type) {
    case ADD:
      if (action.payload.type === "bun") {
        return {
          ...state,
          burgerConstructorBun: action.payload,
        };
      }
      return {
        ...state,
        burgerConstructorList: [
          ...state.burgerConstructorList,
          { constructorItemId: action.id, ...action.payload },
        ],
      }
    case DELETE:
      return {
        ...state,
        burgerConstructorList: state.burgerConstructorList.filter(
          (item) => item.constructorItemId !== action.payload.constructorItemId
        ),
      }
    case SORT:
      return {
          ...state,
          burgerConstructorList: action.payload,
        }
    default:
      return state;
  }
};

export default burgerConstructorReducer;
