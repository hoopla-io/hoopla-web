import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ContactDetails() {
  const t = useTranslations();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8 relative overflow-hidden">
      <h2 className="text-2xl font-bold text-main mb-6">
        {t("contacts.reach-us")}
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-main mr-4" />
          <Link
            href="mailto:davronbekov.otabek@gmail.com"
            className="text-main hover:text-primary transition-colors"
          >
            davronbekov.otabek@gmail.com
          </Link>
        </div>
        <div className="flex items-center">
          <Phone className="h-6 w-6 text-main mr-4" />
          <Link
            href="tel:+998900472400"
            className="text-main hover:text-primary transition-colors"
          >
            +998 90 047-24-00
          </Link>
        </div>
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-main mr-4" />
          <span className="text-main">{t("contacts.location")}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
    </div>
  );
}
