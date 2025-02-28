"use client";

import { useLocale } from "next-intl";
import { privacy } from "@/app/[locale]/privacy-policy/constants";

export default function PrivacyPolicy() {
  const locale = useLocale();

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-coffee-brown">
            {privacy[locale as "uz" | "ru" | "en"].title}
          </h1>
        </div>
        <div className="max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: privacy[locale as "uz" | "ru" | "en"].content,
            }}
          />
        </div>
      </div>
    </main>
  );
}
