import React from "react";
import { NetSalesChart } from "./net-sales-chart";
import { GrossProfitChart } from "./gross-profit-chart";
import { GrossMarginChart } from "./gross-margin-chart";
import { EarningChart } from "./earning-chart";
import CurrentBillCard from "./current-bill-card";
import PayoutAccountCard from "./payount-account-card";

const FinanceCharts = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <div className="w-full max-w-xl">
          <NetSalesChart />
        </div>
        <div className="w-full max-w-xl">
          <GrossProfitChart />
        </div>
        <div className="w-full max-w-xl">
          <GrossMarginChart />
        </div>
      </div>
      <div className="">
        <EarningChart />
      </div>
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <PayoutAccountCard />
        <CurrentBillCard />
      </div>
    </div>
  );
};

export default FinanceCharts;
