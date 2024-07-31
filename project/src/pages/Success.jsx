import React from 'react';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import axiosConfig from '../lib/axiosConfig';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error'
import { MyContext } from '../context/context'

const fetchData = async () => {
  const { data } = await axiosConfig.get('/api/checkout/session-status');
  return data;
};

function Success() {
  const { deleteCart } = React.useContext(MyContext)
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery('paymentStatus', fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Error errorMessage={error.response.data.error} />

  const condition = data?.status === 'paid';

  if (!condition) {
    if (data.status === 'unpaid') {
      navigate('/cancel', { replace: true });
      return <Error errorMessage='You do not have permission to view this page.' />
    }
  }
  deleteCart()

  return (
    <div className='flex flex-col p-5'>
      <div className='flex justify-center '>
        <PriceCheckIcon style={{ width: "20rem", height: "20rem", color: "green" }} />
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-6xl uppercase font-bold'>Payment Successful</h1>
      </div>
      <div className='flex justify-center mt-3'>
        <h2 className='uppercase text-2xl'>Transaction ID: <span>{data.id.slice(-20)}</span></h2>
      </div>
      <h2 className='text-center text-3xl font-semibold uppercase mt-9'>Transaction Details</h2>
      <div className='mt-3 w-3/5 h-auto p-10 border-black border bg-muted self-center grid grid-cols-2 grid-flow-row grid-rows-auto'>
        <h2 className='uppercase font-medium text-2xl'>Name:</h2>
        <p className='uppercase font-normal text-2xl'>{data.details.name}</p>

        <h2 className='uppercase font-medium text-2xl'>Transaction Cost:</h2>
        <p className='uppercase font-normal text-2xl'>${data.total / 100}</p>

        <h2 className='uppercase font-medium text-2xl'>Email:</h2>
        <p className='uppercase font-normal text-2xl'>{data.details.email}</p>

        <h2 className='uppercase font-medium text-2xl'>Shipping address City/Country:</h2>
        <p className='uppercase font-normal text-2xl'>
          {data.details.address.city}, {data.details.address.country === 'PK' ? 'Pakistan' : 'USA'}
        </p>
      </div>

      <h2 className='text-2xl font-light mt-2 text-center'>
        *Note: This is a dummy website and doesn't perform any physical operations.
      </h2>
    </div>
  );
}

export default Success;