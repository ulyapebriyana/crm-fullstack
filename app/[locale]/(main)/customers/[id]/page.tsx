import { getCustomer } from "@/actions/main/customer-action";
import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import EmptyOrder from "@/assets/Customers/empty-order.png";

const CustomerDetail = async ({ params }: { params: { id: string } }) => {
  const employee = await getCustomer({ id: params.id });
  // console.log(employee);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton className="text-2xl" />
          <span className="text-2xl font-bold capitalize">
            {employee?.firstName} {employee?.lastName}
          </span>
        </div>
        <Button>Request Customer Data</Button>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="md:basis-2/3">
          <div className="flex flex-col justify-between rounded-lg border p-5 md:flex-row-reverse">
            <Image
              src={EmptyOrder}
              alt="empty-order"
              height={130}
              width={200}
            />
            <div className="flex flex-col justify-between">
              <div className="">
                <h3 className="text-md font-bold md:mb-2">Last Order Placed</h3>
                <p>This customer hasn&apos;t placed any orders yet</p>
              </div>
              <div className="">
                <Button variant={"outline"}>Create order</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:basis-1/3">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 rounded-lg border p-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Customer</h3>
                <span className="capitalize">
                  {employee?.firstName} {employee?.lastName}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Contact information</h3>
                <div className="">
                  <div>{employee?.email}</div>
                  <div>{employee?.phoneNumber}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Address</h3>
                <div className="">
                  <div>
                    {employee?.address}, {employee?.zipCode}
                  </div>
                  <div>{employee?.country}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold">Marketing</h3>
                <div className="">
                  <p>Email not subcribed</p>
                  <p>SMS not subcribed</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border p-5">
              <h3 className="font-bold">Notes</h3>
              <p>This customer does not have a note.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
