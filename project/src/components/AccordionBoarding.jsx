import React from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/src/libs/ui/accordion"
import DescriptionComponent from "./DescriptionComponent"

export default function AccordionBoarding({item}){
    return(
        <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className='text-3xl font-[400]'>Product Description</AccordionTrigger>
        <AccordionContent className='text-base'>
          <DescriptionComponent item={item} description={true}/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className='text-3xl font-[400]'>Fabric Information</AccordionTrigger>
        <AccordionContent className='text-base'>
          <DescriptionComponent item={item} description={false}/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className='text-3xl font-[400]'>Warranty Information</AccordionTrigger>
        <AccordionContent className='text-base'>
            We offer a 30-day warranty on all our clothing items. If there are any manufacturing defects or quality issues, please contact our customer service team with your purchase receipt and details of the issue. We will provide a replacement or a refund as per our warranty policy.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className='text-3xl font-[400]'>Return Policy</AccordionTrigger>
        <AccordionContent className="text-base">
            If you are not satisfied with your purchase, you can return the item within 30 days of the purchase date. The item must be unworn, unwashed, and in its original packaging. To initiate a return, contact our customer service for a return authorization number. Return shipping costs may apply.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    )
}