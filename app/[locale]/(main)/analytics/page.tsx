import React from "react";
import Title from "../components/title";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { TotalSalesChart } from "./components/total-sales-chart";
import { SalesByChannel } from "./components/sales-by-channel";
import { OnlineStoreSessionChart } from "./components/online-store-session-chart";
import { OnlineStoreConversionRate } from "./components/online-store-conversion-rate";
import { TotalOrderChart } from "./components/total-order-chart";
import { AverageOrderValueChart } from "./components/average-order-value-chart";

const AnalyticPage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Analytics" />
        <div className="flex flex-col gap-4 md:flex-row">
          <Button variant={"outline"}>
            <CalendarIcon className="mr-2" /> Today
          </Button>
          <Button variant={"outline"}>Compare: Yesterday</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        <TotalSalesChart />
        <SalesByChannel />
        <OnlineStoreSessionChart />
        <OnlineStoreConversionRate />
        <TotalOrderChart />
        <AverageOrderValueChart />
      </div>
    </div>
  );
};

export default AnalyticPage;
