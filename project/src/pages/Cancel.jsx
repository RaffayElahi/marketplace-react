import React from 'react'
import axiosConfig from '../lib/axiosConfig';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error'
import CancelIcon from '@mui/icons-material/Cancel';
import {MyContext} from '../context/context'
import { Link } from 'react-router-dom'

const fetchData = async () => {
  const { data } = await axiosConfig.get('/api/checkout/session-status'); 
  return data;
};
function Cancel() {
  const {deleteCart} = React.useContext(MyContext)
  const navigate = useNavigate()
  const {data, isLoading, error} = useQuery('paymentStatus', fetchData,{
    retry: false,
    refetchOnWindowFocus: false,
  })
  if (isLoading) return <div>Loading...</div>;
  if (error) return <Error errorMessage={error.response.data?.error || error.message}/>
  const condition = data?.status === 'unpaid';

  if (!condition) {
    if(data.status === 'paid'){
      navigate('', { replace: true });
      return <Error errorMessage='You do not have permission to view this page.'/>
    }
  }
  deleteCart()
  return (
    <div className='flex flex-col gap-3 justify-start items-center'>
      <div className='flex justify-center '>
        <CancelIcon style={{width: "20rem", height: "20rem"}}/>
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-5xl uppercase'>Payment Cancelled</h1>
      </div>
      <div className='mt-3 flex justify-center'>
        <p className= 'text-2xl uppercase'>The payment for the items in the cart was cancelled.</p>
      </div>
      <div className='mt-3 flex justify-center'>
        <p className= 'text-2xl uppercase'>You can still pay for the items by following the <Link className='underline pointer text-blue-800' to={data.url}>payment link</Link>.</p>
      </div>
    </div>
  )
}

export default Cancel

