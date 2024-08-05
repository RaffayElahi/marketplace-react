import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailCover from '../components/ProductDetailCover';
import SuggestedProducts from '../components/SuggestedProducts';
import axiosConfig from '../lib/axiosConfig';
import NotFound from './NotFound';
import { useQuery } from 'react-query';
import ProductDetailCoverLoader from '../components/Loaders/ProductDetailCoverLoader';
import CartPageHeader from '../components/CartPageHeader'

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
  const { productCode } = useParams();

  const { data: product, error, isLoading } = useQuery(
    ['product', productCode],
    () => fetchProduct(productCode),
    {
      staleTime: 10 * 60 * 1000, 
      retry: false, 
    }
  );

  if (isLoading) return <ProductDetailCoverLoader/>;
  if (error?.message === 'Product not found') return <NotFound />;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <CartPageHeader/>
      <ProductDetailCover productCode={productCode}/>
      <SuggestedProducts productCode={productCode}/>
    </>
  );
}

export default ProductDetail;