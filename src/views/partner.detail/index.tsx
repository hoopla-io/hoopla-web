"use client";

import { use, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Coffee,
  Globe,
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  cn,
  formatBalance,
  type Banner,
  type PartnerData,
  type ShopDrink,
  type ShopDrinkCategory,
} from "@/lib/utils";
import { useRouter } from "@/i18n/routing";

type PropsType = {
  shopDataPromise: Promise<{
    partnerData: PartnerData;
    categories: ShopDrinkCategory[];
    banners: Banner[];
  }>;
};

export default function PartnerDetailView({ shopDataPromise }: PropsType) {
  const { partnerData, categories: rawCategories, banners } = use(shopDataPromise);
  const t = useTranslations();
  const router = useRouter();

  const { categoryNames, hasRealCategories, allDrinks } = useMemo(() => {
    const names = rawCategories.map((c) => c.name);
    const hasReal = rawCategories.some(
      (c) => c.name && c.name.toLowerCase() !== "other"
    );
    const flat = rawCategories.flatMap((c) => c.drinks);
    return {
      categoryNames: hasReal ? names : [],
      hasRealCategories: hasReal,
      allDrinks: flat,
    };
  }, [rawCategories]);

  const [activeCategory, setActiveCategory] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (categoryNames.length > 0 && !activeCategory) {
      setActiveCategory(categoryNames[0]);
    }
  }, [categoryNames, activeCategory]);

  if (!partnerData) {
    return notFound();
  }

  const pictures = partnerData.pictures ?? [];
  const phoneNumbers = partnerData.phoneNumbers ?? [];
  const workingHours = partnerData.workingHours ?? [];
  const urls = partnerData.urls ?? [];

  const heroImage =
    pictures[0]?.pictureUrl || partnerData.pictureUrl || "/placeholder.svg";

  const handleTabClick = (cat: string) => {
    setActiveCategory(cat);
    const el = sectionRefs.current[cat];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBannerClick = (banner: Banner) => {
    switch (banner.linkType) {
      case "url":
        window.open(banner.linkValue, "_blank", "noopener,noreferrer");
        break;
      case "partner":
        router.push(`/shop/${banner.linkValue}`);
        break;
      case "drink": {
        const menuEl = sectionRefs.current.__menu;
        if (menuEl) menuEl.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      }
    }
  };

  const formatTodaysHours = () => {
    const today = new Date()
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();
    const todayHours = workingHours.find((h) => h.weekDay === today);
    if (!todayHours) return t("partner.closed-today");
    return `${todayHours.openAt} - ${todayHours.closeAt}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-[76px]">
      <div className="max-w-lg mx-auto pb-28">
        {/* Hero */}
        <div className="relative">
          <AspectRatio ratio={480 / 320}>
            <Image
              src={heroImage}
              alt={partnerData.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </AspectRatio>
          <button
            onClick={() => router.back()}
            aria-label={t("partner.back")}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="pt-4 px-2 space-y-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {partnerData.name}
          </h1>

          {/* Info card */}
          <div className="bg-white rounded-sm shadow-sm py-4 px-3 space-y-3">
            {workingHours.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    {t("partner.todays-hours")}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatTodaysHours()}
                  </p>
                </div>
              </div>
            )}

            {partnerData.location && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <a
                  href={`https://yandex.uz/maps/?ll=${partnerData.location.lng},${partnerData.location.lat}&z=16&mode=whatshere&whatshere[point]=${partnerData.location.lng},${partnerData.location.lat}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {t("partner.open-in-yandex")}
                </a>
              </div>
            )}

            {phoneNumbers.map((phone, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <a
                  href={`tel:+${phone.phoneNumber}`}
                  className="text-sm font-medium text-gray-900"
                >
                  +{phone.phoneNumber}
                </a>
              </div>
            ))}

            {urls.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {urls[0].urlType === "instagram" ? (
                    <Instagram size={18} className="text-primary" />
                  ) : (
                    <Globe size={18} className="text-primary" />
                  )}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {urls.map((url, i) => (
                    <a
                      key={i}
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {url.urlType === "instagram"
                        ? t("partner.instagram")
                        : t("partner.website")}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Photos */}
          {pictures.length > 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
                {t("partner.photos")}
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                {pictures.map((pic, i) => (
                  <div
                    key={i}
                    className="relative w-32 h-24 rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={pic.pictureUrl}
                      alt={`${partnerData.name} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Banners */}
          {banners.length > 0 && (
            <div className="px-1">
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {banners.map((banner) => (
                  <button
                    key={banner.id}
                    onClick={() => handleBannerClick(banner)}
                    className="relative flex-shrink-0 w-[85%] snap-center rounded-2xl overflow-hidden"
                  >
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title ?? "banner"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 512px) 85vw, 435px"
                      />
                    </AspectRatio>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Menu */}
          {allDrinks.length > 0 && (
            <div
              ref={(el) => {
                sectionRefs.current.__menu = el;
              }}
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-3 px-1">
                {t("partner.menu")}
              </h2>

              {hasRealCategories && (
                <div className="flex gap-2 overflow-x-auto pb-3 mb-1 sticky top-[64px] z-[5] bg-[#f5f5f5] pt-4 px-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
                  {categoryNames.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleTabClick(cat)}
                      className={cn(
                        "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        activeCategory === cat
                          ? "bg-primary text-white"
                          : "bg-white text-gray-600 shadow-sm hover:bg-gray-50"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {hasRealCategories ? (
                <div className="space-y-6 px-2">
                  {rawCategories.map((cat) => (
                    <div
                      key={cat.id}
                      ref={(el) => {
                        sectionRefs.current[cat.name] = el;
                      }}
                      className="scroll-mt-[120px]"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {cat.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {cat.drinks.map((drink) => (
                          <DrinkCard
                            key={drink.id}
                            drink={drink}
                            currency={t("partner.uzs")}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 px-2">
                  {allDrinks.map((drink) => (
                    <DrinkCard
                      key={drink.id}
                      drink={drink}
                      currency={t("partner.uzs")}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DrinkCard({
  drink,
  currency,
}: {
  drink: ShopDrink;
  currency: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <AspectRatio ratio={1}>
        {drink.pictureUrl ? (
          <Image
            src={drink.pictureUrl}
            alt={drink.name}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 50vw, 256px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Coffee size={32} className="text-gray-400" />
          </div>
        )}
      </AspectRatio>
      <div className="p-2.5 flex items-end justify-between">
        <div className="min-w-0">
          <h3 className="font-medium text-sm text-gray-900 leading-tight truncate">
            {drink.name}
          </h3>
          <p className="text-sm font-semibold text-primary mt-1">
            {formatBalance(drink.productPrice)} {currency}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <ChevronRight size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
}
