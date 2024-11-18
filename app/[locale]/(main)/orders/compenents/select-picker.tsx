"use client";
import React, { useEffect } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiselect";

const SelectPicker = ({
  options,
  onSelectionChange,
}: {
  options: Option[];
  onSelectionChange: (selectedOptions: Option[]) => void;
}) => {
  const [data, setData] = React.useState<Option[]>([]);

  useEffect(() => {
    onSelectionChange(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex w-full flex-col gap-5">
      <MultipleSelector
        value={data}
        onChange={(entry) => setData(entry)}
        defaultOptions={options}
        placeholder="Select products..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default SelectPicker;
