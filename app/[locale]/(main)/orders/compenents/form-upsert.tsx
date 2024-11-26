/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useToast } from "@/hooks/use-toast";
import { useEffect, useTransition } from "react";
import { useRouter } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderSchema, OrderSchema } from "@/schemas/order-schema";
import Subtitle from "../../components/subtitle";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import NumericInput from "@/components/numeric-input";
import Image from "next/image";
import SelectPicker from "./select-picker";
import { formatCurrency } from "@/helpers/format-currency";
import { upsertOrder } from "@/actions/main/order-action";

const FormUpsert = ({ orders, id }: { orders?: any; id?: string }) => {
  const { toast } = useToast();
  const router = useRouter();

  const defaultValues: OrderSchema = {
    customerId: "",
    note: "",
    paymentStatus: "",
    total: 0,
    products: [],
  };

  const [isPending, startTransition] = useTransition();

  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultValues,
  });

  const { data: customerOptions, isPending: pendingCustomerOptions } = useQuery(
    {
      queryKey: ["customer-list"],
      queryFn: () => fetch("/api/customers").then((res) => res.json()),
    },
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: dataProducts, isPending: pendingProductOptions } = useQuery({
    queryKey: ["product-list"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

  const handleProductSelect = (selectedOptions: { value: string }[]) => {
    const updatedProducts = selectedOptions.map((option) => ({
      id: option.value,
      quantity: 0,
    }));
    form.setValue("products", updatedProducts);
  };

  const watchProducts = form.watch("products");

  const totalOrder = watchProducts.reduce((acc, value) => {
    const product = dataProducts?.data?.find(
      (product: any) => product.id === value.id,
    );
    const price = product ? product.price : 0;
    return acc + price * value.quantity;
  }, 0);

  async function onSubmit(values: OrderSchema) {
    startTransition(async () => {
      const response = await upsertOrder({ ...values, total: totalOrder }, id);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
          variant: "success",
        });
        router.push("/orders");
      } else {
        toast({
          title: "Failed",
          description: response.message,
          variant: "destructive",
        });
      }
    });
  }

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
                <Subtitle name={"Products"} />
                <div className="flex gap-4">
                  {pendingProductOptions ? (
                    <div>Loading...</div>
                  ) : (
                    <SelectPicker
                      options={dataProducts?.data?.map((value: any) => ({
                        label: value.title,
                        value: value.id,
                      }))}
                      onSelectionChange={handleProductSelect}
                    />
                  )}
                </div>
                <div className="overflow-x-auto">
                  <Table className="table-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[500px]">Image</TableHead>
                        <TableHead className="w-[700px]">Product</TableHead>
                        <TableHead className="w-[200px] text-end">
                          Price
                        </TableHead>
                        <TableHead className="w-[100px] text-end">
                          Quantity
                        </TableHead>
                        <TableHead className="w-[150px] text-right">
                          Total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watchProducts.map((value: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="text-right">
                            <Image
                              src={
                                dataProducts.data.find(
                                  (data: any) => data.id === value.id,
                                ).imageUrl
                              }
                              priority
                              alt="image.png"
                              height={70}
                              width={70}
                              style={{ width: "auto", height: "auto" }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <input
                              type="hidden"
                              {...form.register(`products.${index}.id`)}
                            />
                            <div className="flex items-center gap-4">
                              <p className="md:text-lg">
                                {
                                  dataProducts.data.find(
                                    (data: any) => data.id === value.id,
                                  ).title
                                }
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-end font-medium">
                            <h3 className="md:text-md text-end">
                              {formatCurrency(
                                dataProducts.data.find(
                                  (data: any) => data.id === value.id,
                                ).price,
                              )}
                            </h3>
                          </TableCell>
                          <TableCell className="text-center">
                            <FormField
                              control={form.control}
                              name={`products.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <NumericInput
                                      field={field}
                                      placeholder="0"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(
                              dataProducts.data.find(
                                (data: any) => data.id === value.id,
                              ).price *
                                form.watch(`products.${index}.quantity`),
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg border">
              <div className="flex flex-col gap-7 p-5">
                <Subtitle name={"Payment"} />
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <p className="">Subtotal</p>
                    <p className="text-end">{formatCurrency(totalOrder)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Add discount</p>
                    <p className="text-end">Rp. 0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Add shipping or delivery</p>
                    <p className="text-end">Rp. 0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Estimated tax</p>
                    <p className="text-end">Rp. 0</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">{formatCurrency(totalOrder)}</p>
                </div>
              </div>
              <div className="border-t bg-secondary p-5">
                Add a product to calculate total and view payment options
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-7">
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <Subtitle name="Notes" />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Add your note here."
                          className="resize-none"
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
                <Subtitle name="Customer" />
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pendingCustomerOptions ? (
                            <SelectItem disabled value="pending">
                              loading...
                            </SelectItem>
                          ) : (
                            customerOptions.data?.map((customer: any) => (
                              <SelectItem
                                value={customer.value}
                                key={customer.value}
                              >
                                {customer.fullName}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full rounded-lg border p-5">
              <div className="grid gap-7">
                <Subtitle name="Tags" />
                <Input placeholder="order..." />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button disabled={isPending}>Save Order</Button>
        </div>
      </form>
    </Form>
  );
};

export default FormUpsert;
