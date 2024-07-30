import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { Link } from 'react-router-dom';
// import {
//   ChevronLeft,
//   PlusCircle,
// } from "lucide-react";
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
// import FileUploadButton from './FileUploadButton';
// import { Badge } from "@/src/libs/ui/badge";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/src/libs/ui/breadcrumb";
// import { Button } from "@/src/libs/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/src/libs/ui/card";

// import { Input } from "@/src/libs/ui/input";
// import { Label } from "@/src/libs/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/src/libs/ui/select";
// import { Sheet, SheetContent, SheetTrigger } from "@/src/libs/ui/sheet";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/src/libs/ui/table";
// import { Textarea } from "@/src/libs/ui/textarea";
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "@/src/libs/ui/toggle-group";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider,
// } from "@/src/libs/ui/tooltip";

// // Define the schema for a single variant
// const variantSchema = z.object({
//   id: z.number().int(),
//   color: z.string().min(1, "Color is required"),
//   quantity: z.number().int().nonnegative(),
//   price: z.number().nonnegative(),
//   size: z.enum(['s', 'm', 'l']),
// });

// // Define the main schema
// const productSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   fabricInformation: z.string().optional(),
//   description: z.string().optional(),
//   variants: z.array(variantSchema).min(1, "At least one variant is required"),
//   category: z.enum(['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear']).optional(),
//   status: z.enum(['draft', 'published', 'archived']).optional(),
//   mainImage: z.instanceof(File).optional(),
//   carouselImages: z.array(z.instanceof(File)).optional(),
// });

function DashboardProductEdit() {
//   const { control, handleSubmit, register, setValue, watch } = useForm({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: '',
//       fabricInformation: '',
//       description: '',
//       variants: [
//         { id: 1, color: 'Black', quantity: 100, price: 99.99, size: 's' }
//       ],
//       category: '',
//       status: '',
//       mainImage: null,
//       carouselImages: [],
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'variants',
//   });

//   const onSubmit = (data) => {
//     console.log('Form Data:', data);
//   };

//   const handleFileChange = (name, files) => {
//     setValue(name, files);
//   };

  return (
    <div>Hellow</div>
    // <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
    //   <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    //     <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    //       <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
    //         <div className="flex items-center gap-4">
    //           <Button variant="outline" size="icon" className="h-7 w-7">
    //             <ChevronLeft className="h-4 w-4" />
    //             <span className="sr-only">Back</span>
    //           </Button>
    //           <h1 className="flex-1 uppercase shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
    //             Add product
    //           </h1>
    //           <div className="hidden items-center gap-2 md:ml-auto md:flex">
    //             <Button variant="outline" size="sm">
    //               Discard
    //             </Button>
    //             <Button size="sm" onClick={handleSubmit(onSubmit)}>Save Product</Button>
    //           </div>
    //         </div>
    //         <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
    //           <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
    //             <Card x-chunk="dashboard-07-chunk-0">
    //               <CardHeader>
    //                 <CardTitle>Enter Product Details</CardTitle>
    //                 <CardDescription>
    //                   Add basic information of the product such as name, color, description.
    //                 </CardDescription>
    //               </CardHeader>
    //               <CardContent>
    //                 <div className="grid gap-6">
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="name">Name</Label>
    //                     <Input id="name" type="text" className="w-full" placeholder="Denim Jeans" {...register("name")} />
    //                   </div>
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="fabricInformation">Fabric Information</Label>
    //                     <Textarea id="fabricInformation" placeholder="Add some details of fabric of your product." className="min-h-32" {...register("fabricInformation")} />
    //                   </div>
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="description">Description</Label>
    //                     <Textarea id="description" placeholder="Add basic description of your product." className="min-h-32" {...register("description")} />
    //                   </div>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //             <Card x-chunk="dashboard-07-chunk-1">
    //               <CardHeader>
    //                 <CardTitle>Stock</CardTitle>
    //                 <CardDescription>Add variants of your product in this box.</CardDescription>
    //               </CardHeader>
    //               <CardContent>
    //                 <Table>
    //                   <TableHeader>
    //                     <TableRow>
    //                       <TableHead className="w-[100px]">Color</TableHead>
    //                       <TableHead>Quantity</TableHead>
    //                       <TableHead>Price</TableHead>
    //                       <TableHead className="w-[100px]">Size</TableHead>
    //                       <TableHead className="w-[100px]">Action</TableHead>
    //                     </TableRow>
    //                   </TableHeader>
    //                   <TableBody>
    //                     {fields.map((field, index) => (
    //                       <TableRow key={field.id}>
    //                         <TableCell className="font-normal uppercase">
    //                           <Label htmlFor={`variants.${index}.color`} className="sr-only">Color</Label>
    //                           <Input id={`variants.${index}.color`} type="text" placeholder="Black" {...register(`variants.${index}.color`)} />
    //                         </TableCell>
    //                         <TableCell>
    //                           <Label htmlFor={`variants.${index}.quantity`} className="sr-only">Quantity</Label>
    //                           <Input id={`variants.${index}.quantity`} type="number" placeholder="10" {...register(`variants.${index}.quantity`)} />
    //                         </TableCell>
    //                         <TableCell>
    //                           <Label htmlFor={`variants.${index}.price`} className="sr-only">Price</Label>
    //                           <div className="relative flex items-center">
    //                             <span className="absolute left-2 text-gray-800 font-medium">$</span>
    //                             <Input id={`variants.${index}.price`} type="number" placeholder="50" className="pl-6" {...register(`variants.${index}.price`)} />
    //                           </div>
    //                         </TableCell>
    //                         <TableCell>
    //                           <Controller
    //                             control={control}
    //                             name={`variants.${index}.size`}
    //                             render={({ field }) => (
    //                               <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} variant="outline">
    //                                 <ToggleGroupItem value="s">S</ToggleGroupItem>
    //                                 <ToggleGroupItem value="m">M</ToggleGroupItem>
    //                                 <ToggleGroupItem value="l">L</ToggleGroupItem>
    //                               </ToggleGroup>
    //                             )}
    //                           />
    //                         </TableCell>
    //                         <TableCell>
    //                           <Button size="sm" variant="ghost" onClick={() => remove(index)}>
    //                             <RemoveCircleIcon className="h-3.5 w-3.5 text-red-500" />
    //                           </Button>
    //                         </TableCell>
    //                       </TableRow>
    //                     ))}
    //                   </TableBody>
    //                 </Table>
    //                 <Button variant="outline" size="sm" onClick={() => append({ id: fields.length + 1, color: '', quantity: 0, price: 0, size: 's' })}>
    //                   <PlusCircle className="mr-2 h-4 w-4" />
    //                   Add New
    //                 </Button>
    //               </CardContent>
    //             </Card>
    //             <Card x-chunk="dashboard-07-chunk-2">
    //               <CardHeader>
    //                 <CardTitle>Media</CardTitle>
    //                 <CardDescription>Add images of your product.</CardDescription>
    //               </CardHeader>
    //               <CardContent>
    //                 <div className="grid gap-6">
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="mainImage">Main Image</Label>
    //                     <FileUploadButton id="mainImage" name="mainImage" onChange={(files) => handleFileChange("mainImage", files)} />
    //                   </div>
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="carouselImages">Carousel Images</Label>
    //                     <FileUploadButton id="carouselImages" name="carouselImages" onChange={(files) => handleFileChange("carouselImages", files)} multiple />
    //                   </div>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           </div>
    //           <div className="hidden flex-col gap-4 lg:flex">
    //             <Card>
    //               <CardHeader>
    //                 <CardTitle>Categories</CardTitle>
    //                 <CardDescription>Set category and status of your product.</CardDescription>
    //               </CardHeader>
    //               <CardContent>
    //                 <div className="grid gap-6">
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="category">Category</Label>
    //                     <Select name="category" onValueChange={(value) => setValue("category", value)} defaultValue="">
    //                       <SelectTrigger>
    //                         <SelectValue placeholder="Select a category" />
    //                       </SelectTrigger>
    //                       <SelectContent>
    //                         <SelectItem value="Tops">Tops</SelectItem>
    //                         <SelectItem value="Bottoms">Bottoms</SelectItem>
    //                         <SelectItem value="Dresses">Dresses</SelectItem>
    //                         <SelectItem value="Outerwear">Outerwear</SelectItem>
    //                         <SelectItem value="Footwear">Footwear</SelectItem>
    //                       </SelectContent>
    //                     </Select>
    //                   </div>
    //                   <div className="grid gap-3">
    //                     <Label htmlFor="status">Status</Label>
    //                     <Select name="status" onValueChange={(value) => setValue("status", value)} defaultValue="">
    //                       <SelectTrigger>
    //                         <SelectValue placeholder="Select a status" />
    //                       </SelectTrigger>
    //                       <SelectContent>
    //                         <SelectItem value="draft">Draft</SelectItem>
    //                         <SelectItem value="published">Published</SelectItem>
    //                         <SelectItem value="archived">Archived</SelectItem>
    //                       </SelectContent>
    //                     </Select>
    //                   </div>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
  );
}

export default DashboardProductEdit;