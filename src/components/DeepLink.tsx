"use client";

import { useEffect, useState } from "react";
import { isAndroid, isIOS, isMobile } from "react-device-detect";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";

import HooplaIcon from "@/public/images/app/hoopla.webp";
import { usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function DeepLink() {
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shouldOpen = pathname.includes("/shop");

    if (isMobile && (isAndroid || isIOS) && shouldOpen) {
      setOpen(true);
    }
  }, [pathname]);

  const handleOpenApp = () => {
    const encodedFallback = encodeURIComponent(
      "https://play.google.com/store/apps/details?id=uz.alphazet.hoopla"
    );

    if (isAndroid) {
      const intentUrl = `intent://${pathname}#Intent;scheme=https;package=uz.alphazet.hoopla;S.browser_fallback_url=${encodedFallback};end`;
      window.location.href = intentUrl;
    } else if (isIOS) {
      console.log(pathname);
      window.location.href = `https://hoopla.uz/${locale}${pathname}`;

      setTimeout(() => {
        window.location.href = "https://apps.apple.com/app/id123456789";
      }, 1500);
    }

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {open && <div className="absolute inset-0 bg-black/50 z-40" />}

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-white rounded-t-3xl border-none max-w-md mx-auto">
          <DrawerHeader className="pb-6">
            <DrawerTitle className="text-center text-lg font-medium text-gray-900">
              Выберите, где продолжить
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-6 pb-8 space-y-4">
            {/* Kinopoisk option */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Image src={HooplaIcon.src} alt="Hoopla" layout="fill" />
                </div>
                <span className="text-gray-900 font-medium">Hoopla</span>
              </div>
              <Button
                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full"
                onClick={() => {
                  handleOpenApp();
                }}
              >
                Перейти
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
