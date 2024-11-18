import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@iconify-icon/react";

const PayoutAccountCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="inline-flex items-center gap-2">
            <Icon
              icon={"stash:envelope-flying"}
              className="text-lg text-primary"
            />
            <span>Payout Account</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>To get payouts, you need to finish setting up Boxbox Payments.</p>
        <div className="border-b-2 pt-6"></div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-primary">Complete account setup</p>
        <Icon icon={"vaadin:arrow-right"} className="text-lg text-primary" />
      </CardFooter>
    </Card>
  );
};

export default PayoutAccountCard;
