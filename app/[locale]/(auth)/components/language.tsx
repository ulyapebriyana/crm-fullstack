"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

const SelectLanguage = () => {
  const t = useTranslations("SelectLanguage");
  const locale = useLocale();
  const [language, setLanguage] = useState<string>(locale);
  const router = useRouter();
  const pathname = usePathname();

  function setChangeLanguage(nextLocale: string) {
    setLanguage(nextLocale);
    router.replace(
      `${pathname}`,
      // @ts-expect-error -- TypeScript will validate that only known `params`
      { locale: nextLocale },
    );
  }
  return (
    <Select
      onValueChange={(value) => setChangeLanguage(value)}
      defaultValue={language}
    >
      <SelectTrigger className="w-[60px] md:w-[160px]">
        <SelectValue placeholder="Select Language.." />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((data, index) => {
          return (
            <SelectItem value={data} key={index}>
              <div className="hidden md:block">
                {t("switchLocale", { locale: data })}
              </div>
              <div className="md:hidden">{data === "id" ? "🇮🇩" : "🇺🇸"}</div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
