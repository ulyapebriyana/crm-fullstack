"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "@/i18n/routing";
import { productSchema, ProductSchema } from "@/schemas/product-schema";
import { Checkbox } from "@/components/ui/checkbox";
import NumericInput from "@/components/numeric-input";
import { upsertProduct } from "@/actions/main/product-action";
import { Product } from "@prisma/client";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormUpsert = ({ products, id }: { products?: any; id?: string }) => {
  const data: Product = products ? JSON.parse(products) : products;

  const { toast } = useToast();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string>("/");
  const [isPending, startTransition] = useTransition();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreview(URL.createObjectURL(file));
        setFiles(acceptedFiles);
      }
    },
  });

  const defaultValues: ProductSchema = {
    title: "",
    description: "",
    imageUrl: "",
    imageName: "",
    price: 0,
    compareAtPrice: 0,
    isChangeTax: true,
    costPerItem: 0,
    profit: 0,
    margin: 0,
    isTrackQuantity: true,
    quantity: 0,
    isContinueSelling: false,
    isHasBarcode: false,
    isActive: true,
    isPublishToOnlineStore: true,
    isPublishToShop: true,
    isPublishToInternational: false,
  };

  const parseDataToDefaultValues = (data: Product): ProductSchema => {
    return {
      ...data,
      price: Number(data.price),
      compareAtPrice: Number(data.compareAtPrice),
      costPerItem: Number(data.costPerItem),
      profit: Number(data.profit),
      margin: Number(data.margin),
      quantity: Number(data.quantity),
    };
  };

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: data ? parseDataToDefaultValues(data) : defaultValues,
  });

  async function onSubmit(values: ProductSchema) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("productId", id as string);
      formData.append("plainImage", files[0]);

      const response = await upsertProduct(values, formData);

      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "success",
        });
        router.push("/products");
      } else {
        toast({
          title: "Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    });
  }

  useEffect(() => {
    if (data) {
      setPreview(data.imageUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-7"
      >
        <div className="grid gap-7 md:grid-cols-3">
          <div className="grid gap-7 md:col-span-2">
            <div className="w-full rounded-lg border p-5">
              <div className="flex flex-col gap-7">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell description product..."
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <div className="">
                  <h2 className="text-xl font-bold">Media</h2>
                </div>
                <div className="flex flex-col gap-7 md:flex-row">
                  <div className="flex flex-col gap-3">
                    <div className="max-w-md">
                      <div
                        {...getRootProps()}
                        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                          isDragActive
                            ? "border-primary bg-primary/10"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag drop a file here, or click to select file
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          (Maximum file size is 2MB, and only .png, .jpg, .jpeg,
                          .webp files are accepted)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] w-full md:h-full">
                    <Image
                      src={preview}
                      alt="preview.img"
                      fill
                      style={{
                        objectFit: "contain", // cover, contain, none
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <div className="">
                  <h2 className="text-xl font-bold">Pricing</h2>
                </div>
                <div className="grid gap-7">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <NumericInput field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="compareAtPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compare-at price</FormLabel>
                        <NumericInput field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isChangeTax"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Charge tax on this product</FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="costPerItem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost per item</FormLabel>
                        <NumericInput field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profit</FormLabel>
                        <NumericInput field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="margin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Margin</FormLabel>
                        <NumericInput field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <div className="">
                  <h2 className="text-xl font-bold">Inventory</h2>
                </div>
                <div className="grid gap-7">
                  <FormField
                    control={form.control}
                    name="isTrackQuantity"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Track quantity</FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <NumericInput field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isContinueSelling"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Continue selling when out of stock
                            </FormLabel>
                            <FormDescription>
                              This won&apos;t affect Boxbox POS. Staff will see
                              a warning, but can complete sales when available
                              inventory reaches zero and below
                            </FormDescription>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isHasBarcode"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>This product has a barcode</FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden gap-7 md:flex md:flex-col">
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <div className="">
                  <h2 className="text-xl font-bold">Status</h2>
                </div>
                <div className="grid gap-7">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Active</SelectItem>
                            <SelectItem value="false">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <div className="">
                  <h2 className="text-xl font-bold">Publishing channel</h2>
                </div>
                <div className="grid gap-7">
                  <FormField
                    control={form.control}
                    name="isPublishToOnlineStore"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Online store</FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPublishToShop"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Shop</FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPublishToInternational"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>International</FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button disabled={isPending}>Save Product</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormUpsert;
