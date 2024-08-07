import { useCallback } from 'react' 
import SingleProduct from './SingleProduct'
import axiosConfig from '../lib/axiosConfig'
import { useQuery } from 'react-query'
import ProductRow from './Loaders/ProductRow'
import Error from './Error'

function SiteProducts({productCode, main}) {
  const fetchProducts = useCallback(async (productCode, main) => {
    if (main) {
      const { data } = await axiosConfig.get('/api/product/');
      return data;
    }
    const { data } = await axiosConfig.get('/api/product/random', {
      params: { productCode }
    });
  
    return data;
  }, []);
  const { data, error, isLoading } = useQuery(
    ['products', productCode, main], 
    () => fetchProducts(productCode, main),
    {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false
    }
  );
  if (isLoading) return <ProductRow/>;
  if (error) return <Error errorMessage={error.message}/>;

  return (
    <div className='flex flex-col lg:grid lg:grid-cols-4 h-auto w-full border-b  border-black auto-rows-auto px-5  '>
      {
        data.slice(0, 4).map(product => (
          <SingleProduct
            key={product.productCode} 
            name={product.name}
            mainImage={product.mainImage}
            price={product.variants[0].price}
            variants={product.variants}
            productCode={product.productCode}
            className='border-b-0'
          />
        ))
      }
    </div>
  )
}

export default SiteProducts
