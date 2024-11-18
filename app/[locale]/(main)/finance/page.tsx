import React from "react";
import Title from "../components/title";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import FinanceCharts from "./components/finance-charts";

const FinancePage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Finance" />
        <Button variant={"outline"}>
          <CalendarIcon className="mr-2" /> Last 30 day
        </Button>
      </div>
      <FinanceCharts />
    </div>
  );
};

export default FinancePage;
