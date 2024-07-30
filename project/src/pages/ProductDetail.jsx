import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailCover from '../components/ProductDetailCover';
import SuggestedProducts from '../components/SuggestedProducts';
import axiosConfig from '../lib/axiosConfig';
import NotFound from './NotFound';
import { useQuery } from 'react-query';
import { useToast } from "@/src/libs/ui/use-toast";
import { MyContext } from '../context/context';

const fetchProduct = async (productCode) => {
  try {
    const { data } = await axiosConfig.get(`/api/product/search`, {
      params: { productCode }
    });
    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('Product not found');
    }
    throw error;
  }
};

function ProductDetail() {
  const { toast } = useToast();
  const { productCode } = useParams();
  const { errors } = useContext(MyContext);
  const [hasShownToast, setHasShownToast] = useState(false);

  const { data: product, error, isLoading } = useQuery(
    ['product', productCode],
    () => fetchProduct(productCode),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: false, // Do not retry on error
    }
  );

  useEffect(() => {
    if (errors.length > 0 && !hasShownToast) {
      toast({
        title: "Error Notification",
        description: "An error has occurred. Please check the details.",
        variant: "destructive"
      });
      setHasShownToast(true);
    }
  }, [errors, hasShownToast, toast]);

  if (isLoading) return <div>Loading...</div>;
  if (error?.message === 'Product not found') return <NotFound />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <ProductDetailCover productCode={productCode} />
      {/* <ProductDetailCover product={product[0]} /> */}
      <SuggestedProducts />
    </>
  );
}

export default ProductDetail;