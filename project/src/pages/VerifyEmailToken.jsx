import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosConfig from "../lib/axiosConfig";
import VerifyMailSuccess from "../components/VerifyMailSuccess";
import VerifyDenied from "../components/VerifyDenied";
import EmailLoader from '../components/Loaders/EmailLoader'
import Error from '../components/Error'

export default function VerifyEmailToken() {
    const { token } = useParams();
    const [denied, setDenied] = useState(false);

    const { data, error, isLoading } = useQuery(
        ["verifyEmailToken", token],
        () => axiosConfig.get(`/api/auth/verify-email/${token}`)
            .then(res => res.data),
        {
            onError: () => setDenied(true),
            refetchOnWindowFocus: false,
            onSuccess: () => setDenied(false)
        }
    );

    if (isLoading) return <EmailLoader/>;
    if (error) return <Error errorMessage={error.message}/>;

    return (
        denied ? <VerifyDenied /> : <VerifyMailSuccess email={data.email}/>
    );
}