import { useLocation, Navigate, Outlet } from "react-router-dom";
import { MyContext } from "../context/context";
import { useContext } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(MyContext);
    const location = useLocation();

    return (
        allowedRoles.includes(auth?.roles)
            ? <Outlet />
            : auth?.accessToken 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;