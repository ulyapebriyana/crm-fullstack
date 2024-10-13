"use client";

import { Button } from "@/components/ui/button";
import { downloadFile } from "@/helpers/download-file";
import React, { useTransition } from "react";

const DownloadTemplate = () => {
  const [isPending, startTransition] = useTransition();
  const handleDownload = () => {
    startTransition(async () => {
      await downloadFile(
        "/api/customers/template",
        "Template import customers.xlsx",
      );
    });
  };
  return (
    <Button variant={"secondary"} onClick={handleDownload} disabled={isPending}>
      {isPending ? "Downloading..." : "Download template"}
    </Button>
  );
};

export default DownloadTemplate;
