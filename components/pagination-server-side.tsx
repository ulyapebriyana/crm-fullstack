"use client";

import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { ChangeEvent, useState } from "react";

const PaginationServerSide = ({
  totalPage,
  currentPage = 1,
  selectedFields = 0,
  totalCount,
}: {
  totalPage: number;
  currentPage: number;
  totalCount: number;
  selectedFields: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState("10");

  const handleChangeLimit = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("limit", value);
    } else {
      params.delete("limit");
    }
    router.replace(`${pathname}?${params.toString()}`);

    setLimit(value);
  };

  const handleChangePage = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("page", value.toString());
    } else {
      params.delete("page");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        <p className="hidden md:block">
          {selectedFields} of {totalCount} row(s) selected.
        </p>
      </div>
      <div className="flex items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden text-sm font-medium md:block">Rows per page</p>
          <Select
            value={limit}
            onValueChange={(value: string) => handleChangeLimit(value)}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage <= 1}
            onClick={() => handleChangePage(1)}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage <= 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage >= totalPage}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage >= totalPage}
            onClick={() => handleChangePage(totalPage)}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="hidden items-center space-x-2 md:flex">
          <p className="text-sm font-medium">Go to</p>
          <Input
            className="h-7 max-w-12"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangePage(+e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationServerSide;
