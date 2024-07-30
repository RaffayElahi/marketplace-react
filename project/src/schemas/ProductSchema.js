import { z } from 'zod';
const imageFileSchema = z.instanceof(File)
  .refine((file) => file.size <= 5000000, {
    message: 'Image must be less than 5 MB.',
  })
  .refine((file) => {
    const fileType = file.type.split('/')[1];
    return ['jpg', 'jpeg', 'png', 'webp'].includes(fileType);
  }, {
    message: 'Image must be either jpg, jpeg, or png.',
  });
const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  fabricInformation: z.string().min(1, { message: "Fabric Information is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  variants: z.array(z.object({
    color: z.string().min(1, { message: "Color is required" }),
    quantity: z.number().min(1, { message: "Quantity must be at least 1" }).transform(Number),
    price: z.number().min(0.01, { message: "Price must be at least 0.01" }).transform(Number),
    size: z.enum(['s', 'm', 'l'], { message: "Size is required" }),
  })).min(0, { message: "At least one variant is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  mainImage:
    z.instanceof(FileList)
      .refine((files) => files && files.length === 1, {
        message: 'You must upload a single image.',
      })
      .refine((files) => files[0].size <= 5000000, {
        message: 'Image must be less than 5 MB.',
      })
      .refine((files) => {
        const fileType = files[0].type.split('/')[1];
        return ['jpg', 'jpeg', 'png', 'webp'].includes(fileType);
      }, {
        message: 'Image must be either jpg, jpeg, or png.',
      }),
  

  carouselImages: z
  .array(imageFileSchema)
  .min(1, 'Please select at least one file.')
  .max(5,"Carousel Images shouldn`t be greater than 5 files."),
  
});

export default productSchema