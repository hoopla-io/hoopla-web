"use client";

import { use, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { PartnerData } from "@/lib/utils";
import { notFound } from "next/navigation";

type PropsType = {
  partnerPromise: Promise<{ partnerData: PartnerData }>;
};

export default function PartnerDetailView(props: PropsType) {
  const partnerData = use(props.partnerPromise).partnerData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const t = useTranslations();

  if (!partnerData) {
    return notFound();
  }

  const allImages = [...partnerData.pictures.map((p) => p.pictureUrl)];

  const goToMap = () => {
    window.open(
      `https://www.yandex.uz/maps?ll=${partnerData.location.lng},${partnerData.location.lat}&z=18`,
      "_blank"
    );
  };

  const getCurrentDayWorkingHours = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const currentDay = days[new Date().getDay()];

    const todayHours = partnerData.workingHours.find(
      (wh) => wh.weekDay === currentDay
    );
    if (todayHours) {
      return `${t("partner.open-today")}: ${todayHours.openAt} - ${
        todayHours.closeAt
      }`;
    }
    return "Hours not available";
  };

  const getSocialLinks = () => {
    if (!partnerData.urls) {
      return {};
    }
    const links: { [key: string]: string } = {};
    partnerData.urls.forEach((url) => {
      links[url.urlType] = url.url;
    });
    return links;
  };

  const formatWorkingHours = () => {
    return partnerData.workingHours.map((wh) => ({
      day: t(`weekdays.${wh.weekDay}`),
      hours: `${wh.openAt} - ${wh.closeAt}`,
    }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const socialLinks = getSocialLinks();

  return (
    <div className="min-h-screen bg-background pt-[76px]">
      {/* Image Banner/Slider */}
      <div className="relative">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="relative h-[70vh]">
            {/* Main Image */}
            <div className="absolute inset-0">
              <Image
                src={allImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${partnerData.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-end top-1/4">
              <div className="container px-4 pb-12 mx-auto">
                <div className="flex gap-8 items-end">
                  <div className="w-full">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                      <h2 className="text-4xl font-bold mb-4 text-gray-900">
                        {partnerData.name}
                      </h2>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              {t("weekdays.today")}
                            </div>
                            <div className="font-medium">
                              {getCurrentDayWorkingHours().replace(
                                "Open today: ",
                                ""
                              )}
                            </div>
                          </div>
                        </div>

                        {partnerData.phoneNumbers && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Phone className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">
                                {t("partner.phone")}
                              </div>
                              <div className="font-medium">
                                +{partnerData.phoneNumbers[0]?.phoneNumber}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <Button className="text-white px-6" onClick={goToMap}>
                          <MapPin className="h-4 w-4 mr-2" />
                          {t("partner.get-directions")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 border-0 shadow-lg z-20"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 border-0 shadow-lg z-20"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={allImages[currentImageIndex] || "/placeholder.svg"}
              alt={`${partnerData.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />

            {/* Navigation arrows for multiple images */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1}/{allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Mobile Thumbnail navigation */}
          {allImages.length > 1 && (
            <div className="p-4 bg-gray-50">
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((picture, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={picture || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 space-y-8 md:mt-32">
        {/* Partner Name */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{partnerData.name}</h2>
        </div>

        {/* Working Hours */}
        <Card>
          <CardContent className="px-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{getCurrentDayWorkingHours()}</span>
            </div>

            <Button
              variant="ghost"
              className="p-0 h-auto font-normal text-blue-600 hover:text-blue-700"
              onClick={() => setShowFullSchedule(!showFullSchedule)}
            >
              {showFullSchedule
                ? t("partner.hide-schedule")
                : t("partner.view-full-schedule")}
            </Button>

            {showFullSchedule && (
              <div className="mt-4 space-y-2">
                {formatWorkingHours().map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.day}</span>
                    <span className="text-muted-foreground">{item.hours}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardContent className="px-6 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium">{t("partner.address")}</div>
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal text-blue-600 hover:text-blue-700"
                  onClick={goToMap}
                >
                  {t("partner.get-directions")}
                </Button>
              </div>
            </div>

            {partnerData.phoneNumbers && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a
                  href={`tel:+${partnerData.phoneNumbers[0]?.phoneNumber}`}
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  +{partnerData.phoneNumbers[0]?.phoneNumber}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Social Links */}
        {
          Object.keys(socialLinks).length > 0 && (
            <Card>
          <CardContent className="px-6">
            <h3 className="font-semibold mb-4">{t("partner.social-links")}</h3>
            <div className="flex gap-4">
              {socialLinks.web && (
                <a
                  href={socialLinks.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
          )
        }

        {/* Available Drinks */}
        <div>
          <h3 className="text-xl font-semibold mb-6">{t("partner.drinks")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partnerData.drinks.map((drink) => (
              <Card
                key={drink.id}
                className="overflow-hidden hover:shadow-xl transition-shadow py-0"
              >
                <div className="relative aspect-square">
                  <Image
                    src={drink.pictureUrl || "/placeholder.svg"}
                    alt={drink.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="border-t border-red-800/10 px-2 py-2">
                  <h4 className="font-medium text-lg mb-1">{drink.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
