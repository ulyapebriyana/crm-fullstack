import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify-icon/react";

const CurrentBillCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="inline-flex items-center gap-2">
            <Icon icon={"jam:document"} className="text-lg text-primary" />
            <span>Current Bill</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">$ 0.00</p>
        <div className="border-b-2 pt-5"></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="">2 days left in billing cycle (17 Jan 2024)</p>
      </CardFooter>
    </Card>
  );
};

export default CurrentBillCard;
