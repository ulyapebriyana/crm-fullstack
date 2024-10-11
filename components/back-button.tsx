"use client";

import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify-icon/react";
import * as React from "react";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={cn("flex cursor-pointer items-center", className)}
    >
      <Icon icon="eva:arrow-back-fill" />
    </div>
  );
};

export default BackButton;
