import React from "react";
import Title from "../components/title";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import HomeCharts from "./components/home-charts";
import { TopSellingProduct } from "./components/top-selling-products";
import { PopularCategoryChart } from "./components/popular-category-chart";

const MainHomePage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Home" />
        <Button variant={"outline"}>
          <CalendarIcon className="mr-2" /> Last 30 day
        </Button>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HomeCharts />
        </div>
        <div className="col-span-1 grid gap-5">
          <TopSellingProduct />
          <PopularCategoryChart />
        </div>
      </div>
    </div>
  );
};

export default MainHomePage;
