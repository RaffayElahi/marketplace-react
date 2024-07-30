import * as React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/src/libs/ui/carousel"
//<img src="https://markaware.jp/cdn/shop/files/M24C03BL01C_09_FRONT_3000x3000.jpg?v=1720662258"/>
//<img src="https://markaware.jp/cdn/shop/files/M24C03BL01C_09_D1_3000x3000.jpg?v=1720662258"/>
function CarouselBoarding({imageArray}) {
  return (
    <Carousel>
        <CarouselContent>
            {/* <CarouselItem>
                <img className='w-full h-full object-cover bg-no-repeat align-bottom' src="https://markaware.jp/cdn/shop/files/M24C03BL01C_09_FRONT_3000x3000.jpg?v=1720662258"/>
            </CarouselItem>
            <CarouselItem>
                <img className='w-full h-full object-cover bg-no-repeat align-bottom' src="https://markaware.jp/cdn/shop/files/M24C03BL01C_09_D1_3000x3000.jpg?v=1720662258"/>
            </CarouselItem> */}
            {imageArray.map((item, index) => (
                <CarouselItem key={index}>
                    <img className='w-full h-full object-cover bg-no-repeat align-bottom' src={`/upload/${item}`}/>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
  )
}

export default CarouselBoarding
