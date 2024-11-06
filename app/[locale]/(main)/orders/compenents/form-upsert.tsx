"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { useRouter } from "@/i18n/routing";
// import { Checkbox } from "@/components/ui/checkbox";
// import NumericInput from "@/components/numeric-input";;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify-icon/react";
import { orderSchema, OrderSchema } from "@/schemas/order-schema";
import { Label } from "@/components/ui/label";
import Subtitle from "../../components/subtitle";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import ImageNomic from "@/assets/Customers/empty-order.png";
import { CheckPicker } from "@/components/check-picker";
import NumericInput from "@/components/numeric-input";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // const parseDataToDefaultValues = (data: Product): ProductSchema => {
  //   return {
  //     ...data,
  //     price: Number(data.price),
  //     compareAtPrice: Number(data.compareAtPrice),
  //     costPerItem: Number(data.costPerItem),
  //     profit: Number(data.profit),
  //     margin: Number(data.margin),
  //     quantity: Number(data.quantity),
  //   };
  // };

  const form = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: OrderSchema) {
    startTransition(async () => {
      console.log(values);

      // const response = await upsertProduct({ ...values }, id);

      // if (response.success) {
      //   toast({
      //     title: "Success",
      //     description: response.message,
      //     variant: "success",
      //   });
      //   router.push("/products");
      // } else {
      //   toast({
      //     title: "Failed",
      //     description: response.message,
      //     variant: "destructive",
      //   });
      // }
    });
  }

  const { data: customerOptions, isPending: pendingCustomerOptions } = useQuery(
    {
      queryKey: ["customer-list"],
      queryFn: () => fetch("/api/customers").then((res) => res.json()),
    },
  );
  const { data: dataProducts } = useQuery({
    queryKey: ["product-list"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
  ];

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
                  <CheckPicker />
                </div>
                <div className="overflow-x-auto">
                  <Table className="table-auto">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[700px]">Image</TableHead>
                        <TableHead className="w-[700px]">Product</TableHead>
                        <TableHead className="w-[150px]">Quantity</TableHead>
                        <TableHead className="w-[150px] text-right">
                          Total
                        </TableHead>
                        <TableHead className="w-[50px] text-center"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {options.map(
                        (value: { value: string }, index: number) => (
                          <TableRow key={value.value}>
                            <TableCell className="text-right">
                              <Image
                                src={ImageNomic}
                                alt="image.png"
                                height={120}
                                width={120}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              <input
                                type="hidden"
                                {...form.register(`products.${index}.id`)}
                              />
                              <div className="flex items-center gap-4">
                                <p className="font-bold capitalize md:text-lg">
                                  Macbook pro M1
                                </p>
                              </div>
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
                            <TableCell className="text-right">Rp. 0</TableCell>
                            <TableCell className="text-end">
                              <Icon
                                icon="mdi:trash"
                                className="cursor-pointer text-xl text-destructive"
                                onClick={() => {
                                  console.log("delete");
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ),
                      )}
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
                    <p className="text-end">Rp. 20.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Add discount</p>
                    <p className="text-end">Rp. 20.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Add shipping or delivery</p>
                    <p className="text-end">Rp. 20.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Estimated tax</p>
                    <p className="text-end">Rp. 20.000</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Estimated tax</p>
                  <p className="font-bold">Rp. 0</p>
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
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
