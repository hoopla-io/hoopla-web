import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Map from "@/components/Map";
import Newsletter from "@/components/Newsletter";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t("contacts.title"),
    description: t("contacts.description"),
    keywords: "Hoopla, coffee, subscription, premium, delivery",
  };
}

export default function ContactPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-main text-center mb-4 mt-14">
          {t("contacts.title")}
        </h1>
        <p className="text-xl text-main/80 text-center mb-12">
          {t("contacts.description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <div>
            <ContactDetails />
            <Map />
          </div>
        </div>

        <Newsletter />
      </div>
    </main>
  );
}
