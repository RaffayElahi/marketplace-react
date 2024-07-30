import React, { useState } from 'react';
import SingleProduct from './SingleProduct';
import PaginationDemo from './PaginationBoarding';
import axiosConfig from '../lib/axiosConfig';
import { useQuery } from 'react-query';

const AllProductList = () => {
  const fetchProducts = async () => {
    const { data } = await axiosConfig.get('/api/product/');
    console.log(data);
    return data;
  };

  const { data: products, error, isLoading } = useQuery('products', fetchProducts, {
    staleTime: 10 * 60 * 1000,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='flex flex-col p-5 md:grid md:grid-cols-2 md:auto-rows-[600px] lg:p-0 lg:grid lg:grid-cols-4 lg:auto-rows-[800px] '>
        {currentItems.map((item, index) => (
          <SingleProduct key={index} name={item.name} mainImage={item.mainImage} price={item.variants[0].price} variants={item.variants} productCode={item.productCode} className='border-none lg:border-solid' />
        ))}
      </div>
      <div className='my-5 '>
        <PaginationDemo
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AllProductList;