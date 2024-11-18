import React from "react";
import Title from "../components/title";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Card } from "@/components/ui/card";
import HomeCharts from "./components/home-charts";
import { ArrowRight, Package } from "lucide-react";

const MainHomePage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Title name="Home" />
        <Button variant={"outline"}>
          <CalendarIcon className="mr-2" /> Last 30 day
        </Button>
      </div>
      <div className="grid gap-5">
        <HomeCharts />
        <Card className="flex items-center justify-between p-6 gap-3">
          <div className="flex items-center gap-3">
            <Package /> <span>You have 1 order to fulfill</span>
          </div>
          <ArrowRight className="cursor-pointer hover:text-primary" />
        </Card>
      </div>
    </div>
  );
};

export default MainHomePage;
