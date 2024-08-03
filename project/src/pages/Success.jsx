import React from 'react';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import useAxiosPrivate from '../lib/AxiosPrivate';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import { MyContext } from '../context/context';
import EmailLoader from '../components/Loaders/EmailLoader';



function Success() {
  const axiosPrivate = useAxiosPrivate();
  const fetchData = async () => {
    
    const { data } = await axiosPrivate.get('/api/checkout/session-status');
    return data;
  };
  const { setCart } = React.useContext(MyContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    setCart([]);
  }, [setCart]);

  const { data, isLoading, error } = useQuery('paymentStatus', fetchData, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <EmailLoader />;
  if (error) return <Error errorMessage={error.message} />;

  const condition = data?.status === 'paid';

  if (!condition) {
    if (data.status === 'unpaid') {
      navigate('/cancel', { replace: true });
      return <Error errorMessage='You do not have permission to view this page.' />;
    }
  }

  return (
    <div className='flex flex-col p-5 space-y-6 border-black border-b lg:border-b-0'>
      <div className='flex justify-center'>
        <PriceCheckIcon style={{ width: "10rem", height: "10rem", color: "green" }} className='md:w-20 md:h-20' />
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl md:text-6xl uppercase font-bold'>Payment Successful</h1>
      </div>
      <div className='flex justify-center mt-3'>
        <h2 className='text-lg md:text-2xl uppercase'>Transaction ID: <span>{data.id.slice(-20)}</span></h2>
      </div>
      <h2 className='text-xl md:text-3xl font-semibold uppercase mt-6 text-center'>Transaction Details</h2>
      <div className='mt-3 w-full md:w-4/5 lg:w-3/5 h-auto p-5 md:p-10 border-black border bg-muted self-center grid grid-cols-1 md:grid-cols-2 gap-4'>
        <h2 className='uppercase font-medium text-lg md:text-2xl'>Name:</h2>
        <p className='uppercase font-normal text-lg md:text-2xl'>{data.details.name}</p>

        <h2 className='uppercase font-medium text-lg md:text-2xl'>Transaction Cost:</h2>
        <p className='uppercase font-normal text-lg md:text-2xl'>${data.total / 100}</p>

        <h2 className='uppercase font-medium text-lg md:text-2xl'>Email:</h2>
        <p className='uppercase font-normal text-lg md:text-2xl'>{data.details.email}</p>

        <h2 className='uppercase font-medium text-lg md:text-2xl'>Shipping address City/Country:</h2>
        <p className='uppercase font-normal text-lg md:text-2xl'>
          {data.details.address.city}, {data.details.address.country === 'PK' ? 'Pakistan' : 'USA'}
        </p>
      </div>

      <h2 className='text-base md:text-2xl font-light mt-2 text-center'>
        *Note: This is a dummy website and doesn't perform any physical operations.
      </h2>
    </div>
  );
}

export default Success;
