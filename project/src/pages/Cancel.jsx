import React from 'react';
import useAxiosPrivate from '../lib/AxiosPrivate';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import EmailLoader from '../components/Loaders/EmailLoader';



export default function Cancel() {
  const axiosPrivate = useAxiosPrivate();
  const fetchData = async () => {
    const { data } = await axiosPrivate.get('/api/checkout/session-status'); 
    return data;
  };
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery('paymentStatus', fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <EmailLoader />;
  if (error) return <Error errorMessage={error.response.data?.error || error.message} />;
  
  const condition = data?.status === 'unpaid';

  if (!condition) {
    if (data.status === 'paid') {
      navigate('', { replace: true });
      return <Error errorMessage='You do not have permission to view this page.' />;
    }
  }

  return (
    <div className='flex flex-col  gap-4 h-auto p-20 pb-20 items-center border-black border-b lg:border-b-0'>
      <div className='flex justify-center'>
        <CancelIcon 
          style={{ width: "10rem", height: "10rem" }} 
          className='md:w-16 md:h-16 sm:w-12 sm:h-12' 
        />
      </div>
      <div className='flex flex-col items-center text-center'>
        <h1 className='text-4xl md:text-5xl sm:text-3xl font-bold uppercase'>Payment Cancelled</h1>
      </div>
      <div className='mt-4'>
        <p className='text-xl md:text-2xl sm:text-lg uppercase'>
          The payment for the items in the cart was cancelled.
        </p>
      </div>
      <div className='mt-4'>
        <p className='text-xl text-left md:text-center md:text-2xl sm:text-lg uppercase'>
          You can still pay for the previously selected items by following the 
          <Link className='underline text-blue-800 ml-2' to={data.url}>payment link</Link>.
        </p>
      </div>
    </div>
  );
}
