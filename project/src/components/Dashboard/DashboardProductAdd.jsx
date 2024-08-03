import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import productSchema from "../../schemas/ProductSchema";
import { Upload } from "lucide-react";
import useAxiosPrivate from '../../lib/AxiosPrivate'

import { ChevronLeft, PlusCircle } from "lucide-react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import { Button } from "@/src/libs/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/libs/ui/card";

import { Input } from "@/src/libs/ui/input";
import { Label } from "@/src/libs/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/libs/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/libs/ui/table";
import { Textarea } from "@/src/libs/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/src/libs/ui/toggle-group";

import axios from "axios";

function DashboardProductEdit() {
  const [preview, setPreview] = useState(null);
  const [previewTwo, setPreviewTwo] = useState([]);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      fabricInformation: "",
      description: "",
      variants: [],
      category: "",
      status: "",
      mainImage: {},
      carouselImages: [],
    },
    shouldUnregister: true,
  });
  const axiosPrivate = useAxiosPrivate();
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("fabricInformation", data.fabricInformation);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("status", data.status);

    if (data.mainImage && data.mainImage[0]) {
      formData.append("mainImage", data.mainImage[0]);
    }

    if (Array.isArray(data.carouselImages)) {
      data.carouselImages.forEach((file) => {
        formData.append("carouselImages", file);
      });
    } else {
      console.warn("carouselImages is not an array:", data.carouselImages);
    }

    formData.append("variants", JSON.stringify(data.variants));

    try {
      const response = await axiosPrivate.post(
        "http://localhost:4000/api/productadmin/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      reset();
      setPreview(null)
      setPreviewTwo([])
      window.location.reload()
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fileInputRef = useRef(null);
  const fileInputRefTwo = useRef(null);

  const handleUploadedFile = (event) => {
    const file = event.target.files[0];
    if (fileInputRef.current !== file) {
      fileInputRef.current = file;
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
      setValue("mainImage", event.target.files);
    }
  };
  const handleRemoveFile = () => {
    setPreview(null);
    setValue("mainImage", null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleUploadedFileTwo = (event) => {
    event.preventDefault();
    const files = event.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviewTwo((prevPreviews) => [...prevPreviews, ...newImages]);
      setValue("carouselImages", [
        ...previewTwo.map((img) => img.file),
        ...newImages.map((img) => img.file),
      ]);
    }
  };
  const handleRemoveImage = (index) => {
    setPreviewTwo((prevPreviews) => {
      const updatedPreviews = prevPreviews.filter((_, i) => i !== index);
      setValue(
        "carouselImages",
        updatedPreviews.map((img) => img.file)
      );
      return updatedPreviews;
    });
  };
  const handleButtonClickTwo = (e) => {
    e.preventDefault();
    fileInputRefTwo.current.click();
  };
  const handleButtonClickOne = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  const [variants, setVariants] = useState([
    { id: 1, color: "", quantity: 0, price: 0, size: "s" },
  ]);

  const handleAddVariant = (e) => {
    e.preventDefault();
    const newVariant = {
      id: variants.length + 1,
      color: "",
      quantity: 0,
      price: 0,
      size: "s",
    };
    setVariants([...variants, newVariant]);
  };

  const handleRemoveVariant = (id) => {
    const updatedValue = variants.filter((variant) => variant.id !== id);
    setVariants(updatedValue);
    setValue("variants", updatedValue);
  };

  const handleInputChange = (id, field, value) => {
    const updatedValue =
      field === "quantity" || field === "price" ? Number(value) : value;
    setValue(`variants.${id}.${field}`, updatedValue);
    const newVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, [field]: value } : variant
    );
    setVariants(newVariants);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                  <h1 className="flex-1 uppercase shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Add product
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                    <Button type="submit" size="sm">
                      Save Product
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Enter Product Details</CardTitle>
                        <CardDescription>
                          Add basic information of the product such as name,
                          color, description.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              type="text"
                              className="w-full"
                              placeholder="Denim Jeans"
                              {...register("name")}
                            />
                            {errors.name && (
                              <span className="text-red-500">
                                {errors.name.message}
                              </span>
                            )}
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="fabricInformation">
                              Fabric Information
                            </Label>
                            <Textarea
                              id="fabricInformation"
                              placeholder="Add some details of fabric of your product."
                              className="min-h-32"
                              {...register("fabricInformation")}
                            />
                            {errors.fabricInformation && (
                              <span className="text-red-500">
                                {errors.fabricInformation.message}
                              </span>
                            )}
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              placeholder="Add basic description of your product."
                              className="min-h-32"
                              {...register("description")}
                            />
                            {errors.description && (
                              <span className="text-red-500">
                                {errors.description.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-07-chunk-1">
                      <CardHeader>
                        <CardTitle>Stock</CardTitle>
                        <CardDescription>
                          Add variants of your product in this box.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Color</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead className="w-[100px]">Size</TableHead>
                              <TableHead className="w-[100px]">
                                Action
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {variants.map((variant, index) => (
                              <TableRow key={variant.id}>
                                <TableCell>
                                  <Label
                                    htmlFor={`color-${variant.id}`}
                                    className="sr-only"
                                  >
                                    Color
                                  </Label>
                                  <Input
                                    id={`color-${variant.id}`}
                                    type="text"
                                    placeholder="Black"
                                    {...register(`variants.${index}.color`)}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "color",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors.variants?.[index]?.color && (
                                    <span className="text-red-500">
                                      {errors.variants[index].color.message}
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Label
                                    htmlFor={`quantity-${variant.id}`}
                                    className="sr-only"
                                  >
                                    Quantity
                                  </Label>
                                  <Input
                                    id={`quantity-${variant.id}`}
                                    type="number"
                                    placeholder="10"
                                    {...register(`variants.${index}.quantity`, {
                                      valueAsNumber: true,
                                    })}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "quantity",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {errors.variants?.[index]?.quantity && (
                                    <span className="text-red-500">
                                      {errors.variants[index].quantity.message}
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Label
                                    htmlFor={`price-${variant.id}`}
                                    className="sr-only"
                                  >
                                    Price
                                  </Label>
                                  <div className="relative flex items-center">
                                    <span className="absolute left-2 text-gray-800 font-medium">
                                      $
                                    </span>
                                    <Input
                                      id={`price-${variant.id}`}
                                      type="number"
                                      placeholder="50"
                                      className="pl-6"
                                      {...register(`variants.${index}.price`, {
                                        valueAsNumber: true,
                                      })}
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          "price",
                                          e.target.value
                                        )
                                      }
                                    />
                                    {errors.variants?.[index]?.price && (
                                      <span className="text-red-500">
                                        {errors.variants[index].price.message}
                                      </span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <ToggleGroup
                                    type="single"
                                    value={variant.size}
                                    onValueChange={(value) =>
                                      handleInputChange(index, "size", value)
                                    }
                                    {...register(`variants.${index}.size`)}
                                  >
                                    <ToggleGroupItem value="s">
                                      S
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="m">
                                      M
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="l">
                                      L
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                  {errors.variants?.[index]?.size && (
                                    <span className="text-red-500">
                                      {errors.variants[index].size.message}
                                    </span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {variants.length >= 2 && (
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handleRemoveVariant(variant.id)
                                      }
                                    >
                                      <RemoveCircleIcon />
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                            {errors.variants && (
                              <span className="text-red-500">
                                {errors.variants.message}
                              </span>
                            )}
                          </TableBody>
                        </Table>
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center justify-center rounded-md  text-slate-600 transition-all duration-75  hover:text-gray-950"
                            onClick={handleAddVariant}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Variant
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-2">
                      <CardHeader>
                        <CardTitle>Product Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 sm:grid-cols-3">
                          <div className="grid gap-3">
                            <Label htmlFor="category">Category</Label>
                            <Controller
                              name="category"
                              control={control}
                              render={({ field }) => {
                                return (
                                  <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger
                                      id="category"
                                      aria-label="Select category"
                                      {...field}
                                    >
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="tops">Tops</SelectItem>
                                      <SelectItem value="bottoms">
                                        Bottoms
                                      </SelectItem>
                                      <SelectItem value="dresses">
                                        Dresses
                                      </SelectItem>
                                      <SelectItem value="outerwear">
                                        Outerwear
                                      </SelectItem>
                                      <SelectItem value="footwear">
                                        Footwear
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                );
                              }}
                            />
                            {errors.category && (
                              <span className="text-red-500">
                                {errors.category.message}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                      <Card x-chunk="dashboard-07-chunk-3">
                        <CardHeader>
                          <CardTitle>Product Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6">
                            <div className="grid gap-3">
                              <Label htmlFor="status">Status</Label>
                              <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger
                                      id="status"
                                      aria-label="Select status"
                                      {...field}
                                    >
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="draft">
                                        Draft
                                      </SelectItem>
                                      <SelectItem value="active">
                                        Active
                                      </SelectItem>
                                      <SelectItem value="archived">
                                        Archived
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              {errors.status && (
                                <span className="text-red-500">
                                  {errors.status.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Main Image</CardTitle>
                        <CardDescription>
                          Upload your product's main image which will be
                          displayed on the product card and also on carousel.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <img
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={preview ? preview : "/placeholder.svg"}
                            width="300"
                          />
                          {preview && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="uppercase"
                              onClick={handleRemoveFile}
                            >
                              Remove
                            </Button>
                          )}
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <input
                                {...register("mainImage")}
                                ref={fileInputRef}
                                type="file"
                                onChange={handleUploadedFile}
                                accept="image/png, image/jpeg image/jpg"
                                style={{ display: "none" }}
                              />

                              <button
                                className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                                onClick={handleButtonClickOne}
                              >
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Upload</span>
                              </button>
                              {errors.mainImage && (
                                <p className="text-red-500">
                                  {errors.mainImage.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-5"
                    >
                      <CardHeader>
                        <CardTitle>Carousel Images</CardTitle>
                        <CardDescription>
                          Upload carousel images of your product.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-5 grid-cols-1  lg:grid-cols-2">
                          {previewTwo.length === 0 && (
                            <img
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              src="/placeholder.svg"
                              width="300"
                            />
                          )}
                          {previewTwo.map((image, index) => (
                            <div className="flex flex-col space-y-2">
                              <img
                                src={image.url}
                                alt={`preview-${index}`}
                                width="300"
                                height="300"
                                className="aspect-square w-full rounded-md object-cover"
                                id={index}
                              />

                              <Button
                                size="sm"
                                variant="destructive"
                                className="uppercase"
                                onClick={() => handleRemoveImage(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <div>
                            <input
                              {...register("carouselImages")}
                              ref={fileInputRefTwo}
                              type="file"
                              onChange={handleUploadedFileTwo}
                              accept="image/png, image/jpeg image/jpg"
                              multiple
                              style={{ display: "none" }}
                            />
                            <button
                              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                              onClick={handleButtonClickTwo}
                            >
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </button>
                          </div>
                        </div>

                        {errors.carouselImages && (
                          <p className="text-red-500">
                            {errors.carouselImages.message}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button type="submit" disabled={!isValid} size="sm">
                    Save Product
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
      
    </>
  );
}

export default DashboardProductEdit;
