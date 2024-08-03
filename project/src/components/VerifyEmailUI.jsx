import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axiosConfig from '../lib/axiosConfig'; 
import { Button } from '@/src/libs/ui/button';
import Error from './Error'
import EmailLoader from './Loaders/EmailLoader'

const fetchVerifyEmail = async () => {
    const response = await axiosConfig.get('/api/auth/verify-email');
    return response.data;
};

export default function VerifyEmailUI() {
    const { data, error, isLoading } = useQuery('verifyEmail', fetchVerifyEmail);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('moew')

    useEffect(() => {
        if (data) {
            setMessage(data.message);
            setEmail(data.email)
        } else if (error) {
            setMessage(error.response?.message || 'Error verifying email.');
        }
    }, [data, error]);

    if (isLoading) {
        return <EmailLoader/>;
    }
    if (error){
        return <Error errorMessage={error.response.data.message || error.message}/>
    }

    return (
        <>
            <div className="flex flex-col items-center gap-10 p-6 h-[65vh] justify-center w-full border-b border-black lg:border-b-0">
                <div className="flex justify-center">
                    <svg viewBox="0 0 48.00 48.00" width="150" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <h2 className='text-4xl md:text-5xl lg:text-6xl uppercase text-center font-medium text-black'>
                    Verify your email
                </h2>
                <p className='text-lg md:text-xl lg:text-2xl text-center font-normal w-full md:w-4/5 lg:w-2/5 text-black'>
                    We've sent an email to <span className="font-medium">{email}</span>. By verification you would be able to check out and buy products from our store.
                </p>
                <div className='flex flex-col space-y-2 w-full md:w-3/5 lg:w-1/5'>
                    <Button className='w-full h-10 text-lg'>Change Email</Button>
                </div>
            </div>
        </>
    );
}