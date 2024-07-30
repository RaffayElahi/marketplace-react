import { useLocation, Navigate, Outlet } from "react-router-dom";
import { MyContext } from "../context/context";
import { useContext, useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(MyContext);
    const location = useLocation();

    useEffect(() => {
        console.log("Auth State:", auth);
        console.log("Allowed Roles:", allowedRoles);
    }, [auth, allowedRoles])

    return (
        allowedRoles.includes(auth?.roles)
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;