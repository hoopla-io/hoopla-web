import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";

import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useLocale } from "next-intl";

const locales: ("uz" | "en" | "ru")[] = ["uz", "en", "ru"];

export const LocaleSwitcher = (props: { className: string }) => {
  const { className } = props;
  const router = useRouter();
  const params = useSearchParams();

  const locale = useLocale();

  const pathname = usePathname();

  const pathnameWithParams = queryString.stringifyUrl({
    url: pathname,
    query: Object.fromEntries(params.entries()),
  });

  const onChange = (lang: "uz" | "en" | "ru") => {
    router.replace(pathnameWithParams, { locale: lang });
  };

  return (
    <div className={clsx(className, "max-w-60 gap-2")}>
      {/*  className="max-w-60 gap-2 hidden lg:flex" */}
      {locales.map((id, index) => (
        <button
          key={index}
          onClick={() => onChange(id)}
          className={cn("rounded-none text-main font-normal uppercase font-eugusto", {
            "border-b-2 border-main": id === locale,
          })}
        >
          {id}
        </button>
      ))}
    </div>
  );
};
