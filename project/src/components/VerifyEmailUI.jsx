import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axiosConfig from '../lib/axiosConfig'; 
import { Button } from '@/src/libs/ui/button';


const fetchVerifyEmail = async () => {
    const response = await axiosConfig.get('/api/auth/verify-email');
    return response.data;
};

export default function VerifyEmailUI() {
    const { data, error, isLoading } = useQuery('verifyEmail', fetchVerifyEmail);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (data) {
            setMessage(data.message);
            setEmail(data.email)
        } else if (error) {
            setMessage(error.response?.message || 'Error verifying email.');
        }
    }, [data, error]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error){
        return <p>{error.message}</p>
    }

    return (
        
        <>
            <div className="flex flex-col items-center gap-10 p-6 h-[65vh] justify-center w-full">
                <div>
                    <svg viewBox="0 0 48.00 48.00" width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M36 15H44V28V41H4V28V15H12" stroke="#000000" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M24 19V5" stroke="#000000" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M30 11L24 5L18 11" stroke="#000000" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M4 15L24 30L44 15" stroke="#000000" stroke-width="1.9200000000000004" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </div>
                <h2 className='text-6xl uppercase text-center font-[500] text-black'>Verify your email</h2>
                <p className='text-2xl text-center font-[400] w-2/5 text-black'>
                    We've sent an email to <span className="font-[500]">{email}</span>. By verification you would be able to check out and buy products from our store.
                </p>
                <div className='flex flex-col space-y-2 w-1/5'>
                    <Button className='w-full h-10 text-lg'>Change Email</Button>
                </div>
            </div>
        </>
    );
}