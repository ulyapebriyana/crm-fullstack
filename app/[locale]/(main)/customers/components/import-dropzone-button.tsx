"use client";

import { importCustomers } from "@/actions/main/customer-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import ExcelJS from "exceljs";
import DownloadTemplate from "./download-template";

const ImportDropzoneButton = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close

  const { toast } = useToast();

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
      },
    });

  const fileData = acceptedFiles.map((file) => (
    <li
      key={file.path}
      className="my-2 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 p-2"
    >
      <span className="text-sm text-gray-700">{file.path}</span>
      <span className="text-xs text-gray-500">
        {(file.size / 1024).toFixed(2)} KB
      </span>
    </li>
  ));

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFiles([...acceptedFiles]);
    }
  }, [acceptedFiles]);

  const onSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload an .xlsx file before submitting.");
      return;
    }

    startTransition(() => {
      const file = files[0];

      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = async (e: any) => {
        const arrayBuffer = e.target.result;
        const workbook = new ExcelJS.Workbook();

        await workbook.xlsx.load(arrayBuffer);

        const worksheet = workbook.worksheets[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const jsonData: any[] = [];

        const headers: string[] = [];
        worksheet.getRow(1).eachCell((cell) => {
          headers.push(cell.text);
        });

        // Iterasi setiap baris dan ambil datanya
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // Skip header row
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const rowData: any = {};
          row.eachCell((cell, colNumber) => {
            rowData[headers[colNumber - 1]] = cell.text;
          });
          jsonData.push(rowData);
        });

        const response = await importCustomers({
          data: JSON.stringify(jsonData),
        });

        if (response.success) {
          toast({
            title: "Success",
            description: response.message,
            variant: "success",
          });
          setIsOpen(false);
        } else {
          toast({
            title: "Failed",
            description: response.message,
            variant: "destructive",
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Import customers
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Customers</DialogTitle>
          <DialogDescription>
            Make sure the data arrangement matches the available columns.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto max-w-md">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag drop a file here, or click to select file
            </p>
            <p className="mt-1 text-xs text-gray-500">
              (Maximum file size is 5MB, and only .xlsx files are accepted)
            </p>
          </div>
          <ul>{fileData}</ul>
        </div>
        <DialogFooter>
          <div className="flex w-full justify-between">
            <DownloadTemplate />
            <Button type="submit" onClick={onSubmit} disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDropzoneButton;
