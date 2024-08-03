import { Outlet } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import useRefreshToken from "../lib/useRefreshToken";
import { MyContext } from "../context/context";
import EmailLoader from "./Loaders/EmailLoader";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useContext(MyContext);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return <>{isLoading ? <EmailLoader fullscreen={true} /> : <Outlet />}</>;
};

export default PersistLogin;
