import React, { useEffect, useState, useMemo } from 'react';
import CarouselBoarding from './CarouselBoarding';
import AccordionBoarding from './AccordionBoarding';
import Cart from './Cart';
import ShowColor from './showColor';
import { TooltipProvider } from "@/src/libs/ui/tooltip";
import SizesSelector from './sizesSelector';
import axiosConfig from '../lib/axiosConfig';
import { useQuery } from 'react-query';

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

const getUniqueColors = (variants) => {
  let colors = variants.map(obj => obj.color);
  let uniqueColorsSet = new Set(colors);
  let uniqueColors = Array.from(uniqueColorsSet);
  return uniqueColors.map(v => v.toLowerCase());
};

const getSizeAndQuantityByColor = (variants, color) => {
  const filteredVariants = variants.filter(variant => variant.color.toLowerCase() === color.toLowerCase());
  return filteredVariants.map(variant => ({
    size: variant.size,
    quantity: variant.quantity
  }));
};

const findVariantIdByColorAndSize = (product, color, size) => {
  if (!product || !product.variants) {
    console.error('Product or variants are not defined');
    return null;
  }

  // Find the variant matching the provided color and size
  const variant = product.variants.filter(
    variant => variant.size === size && variant.color.toLowerCase() === color
  );

  if (variant.length === 0) {
    const sizes = getSizeAndQuantityByColor(product.variants, color);
    const req = sizes.filter(item => item.size !== size);

    for (let i = 0; i < req.length; i++) {
      const variant = product.variants.filter(
        variant => variant.size === req[i].size && variant.color.toLowerCase() === color
      );
      if (variant.length !== 0) {
        return { id: variant[0]._id, productCode: product.productCode, quantity: 1 };
      }
    }
  }

  // Return the variant's _id if found, otherwise null
  return { id: variant[0]?._id, productCode: product.productCode, quantity: 1 };
};

export default function ProductDetailCover({ productCode }) {
  const { data: prod, error, isLoading } = useQuery(
    ['product', productCode],
    () => fetchProduct(productCode),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: false, // Do not retry on error
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error?.message === 'Product not found') return <NotFound />;
  if (error) return <div>An error occurred: {error.message}</div>;

  const product = prod[0];
  const colors = useMemo(() => getUniqueColors(product.variants), [product.variants]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [Usersize, setSize] = useState(() => {
    const sizeData = getSizeAndQuantityByColor(product.variants, colors[0]);
    return sizeData[0]?.size || '';
  });

  useEffect(() => {
    if (colors.length > 0 && selectedColor !== colors[0]) {
      setSelectedColor(colors[0]);
    }
  }, [colors]);

  useEffect(() => {
    const sizeData = getSizeAndQuantityByColor(product.variants, selectedColor);
    if (sizeData.length > 0) {
      setSize(sizeData[0].size);
    }
  }, [selectedColor, product.variants]);

  const sizeData = getSizeAndQuantityByColor(product.variants, selectedColor);
  const quant = sizeData.find(obj => obj.size === Usersize);
  const quantity = (quant) ? quant.quantity : sizeData[0]?.quantity || 0;

  const extractImages = (obj) => {
    const { mainImage, carouselImages } = obj;
    if (!Array.isArray(carouselImages)) {
      throw new Error('carouselImage should be an array');
    }
    const names = carouselImages.map(item => item.name);
    return [mainImage, ...names];
  };

  const imgArray = extractImages(product);

  return (
    <div className='w-full h-auto flex flex-col border-b pb-5 border-black lg:flex lg:flex-row'>
      <div className='h-max overflow-hidden lg:w-1/2 relative'>
        <CarouselBoarding imageArray={imgArray} />
      </div>
      <div className='flex flex-col p-6 gap-7 lg:justify-center lg:pl-16 lg:pt-16 lg:pr-16 lg:w-1/2'>
        <div className='space-y-2'>
          <h1 className="text-black text-3xl uppercase font-[500]">{product.name}</h1>
          <h1 className='text-black text-3xl uppercase font-[500]'>{product.variants[0].color}</h1>
        </div>
        <div className=''>
          <h1 className='text-current text-3xl uppercase font-[500]'>${product.variants[0].price} <span className='font-[300]'>(TAX INCLUDED)</span></h1>
        </div>
        <div className='w-full flex gap-5 justify-center flex-col'>
          <span className='uppercase text-sm text-left'>Selected Color: {selectedColor}</span>
          <div className='flex gap-5'>
            <TooltipProvider>
              {
                colors.map((color, index) => (
                  <ShowColor color={color} selected={selectedColor} setSelected={setSelectedColor} index={index} key={index} />
                ))
              }
            </TooltipProvider>
          </div>
        </div>
        <div className='w-full flex gap-5 justify-center flex-col'>
          <span className='uppercase text-sm text-left'>Sizes:</span>
          <div className='flex gap-5'>
            {
              sizeData.map((size, index) => (
                <SizesSelector size={size.size} UserSize={Usersize} setSize={setSize} quantity={size.quantity} index={index} key={index} />
              ))
            }
          </div>
          <span className='uppercase text-sm text-left'>Quantity left in stock: {quantity}</span>
        </div>
        {(product.variants) ?
          <div className='w-full my-10'>
            <Cart selectedColor={selectedColor} Usersize={Usersize} product={product} filterFunction={findVariantIdByColorAndSize} />
          </div> : ''}
        <div className="w-full h-full">
          <AccordionBoarding item={product} />
        </div>
      </div>
    </div>
  );
}