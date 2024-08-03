import { useLocation, Outlet, Navigate } from "react-router-dom";
import { MyContext } from "../context/context";
import { useContext, useEffect, useState } from "react";

const AuthExistance = () => {
    const { auth } = useContext(MyContext);
    const location = useLocation();
    const [navigateTo, setNavigateTo] = useState(null)
    useEffect(() => {
        if (Object.keys(auth).length !== 0) {
            setNavigateTo(location.state?.from || '/');
        }
    }, [auth, location])

    return (
        (auth.username)
            ? <Navigate to='/' replace />
            : <Outlet/>
    );
}

export default AuthExistance;