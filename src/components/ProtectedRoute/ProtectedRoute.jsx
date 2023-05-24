import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ element }) => {
    const isAuthorization = useSelector(state => state.authorizeReducer.isAuthorization)
    const location = useLocation();

    return (
        isAuthorization ? (element) : (<Navigate replace to='/login' state={{ from: location }} />)
    )
}

export default ProtectedRoute;
