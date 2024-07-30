import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosConfig from "../lib/axiosConfig";
import VerifyMailSuccess from "../components/VerifyMailSuccess";
import VerifyDenied from "../components/VerifyDenied";

export default function VerifyEmailToken() {
    const { token } = useParams();
    const [denied, setDenied] = useState(false);

    const { data, error, isLoading } = useQuery(
        ["verifyEmailToken", token],
        () => axiosConfig.get(`/api/auth/verify-email/${token}`)
            .then(res => res.data),
        {
            onError: () => setDenied(true),
            onSuccess: () => setDenied(false)
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        denied ? <VerifyDenied /> : <VerifyMailSuccess email={data.email}/>
    );
}