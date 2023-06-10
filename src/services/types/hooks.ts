import { 
    TypedUseSelectorHook, 
    useSelector as selectorHook,
    useDispatch as dispatchHook
} from "react-redux";
import { AppDispatch, RootState, AppThunk} from "./types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>(); 