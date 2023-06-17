import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";


type TProtectedRoute = {
    element: any
}

const ProtectedRoute: FC<TProtectedRoute> = ({ element }) => {
    const isAuthorization = useSelector(state => state.authorizeReducer['isAuthorization']);
    const location = useLocation();

    return (
        isAuthorization ? (element) : (<Navigate replace to='/login' state={{ from: location }} />)
    )
}


export default ProtectedRoute;
