"use client";

import { useLocale } from "next-intl";
import { terms } from "@/app/[locale]/terms-of-use/constants";

export default function TermsOfUse() {
  const locale = useLocale();

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-coffee-brown">
            {terms[locale as "uz" | "ru" | "en"].title}
          </h1>
        </div>
        <div className="max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: terms[locale as "uz" | "ru" | "en"].content,
            }}
          />
        </div>
      </div>
    </main>
  );
}
