"use client";

import { motion } from "framer-motion";
import { Coffee, MapPin, HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";

const features = [
  {
    icon: Coffee,
    "title-key": "feature-1.title",
    "description-key": "feature-1.description",
  },
  {
    icon: HeartHandshake,
    "title-key": "feature-2.title",
    "description-key": "feature-2.description",
  },
  {
    icon: MapPin,
    "title-key": "feature-4.title",
    "description-key": "feature-4.description",
  },
];

const Features = () => {
  const t = useTranslations();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-main text-center mb-12">
          {t("features.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-main mb-2">
                {t(`features.${feature["title-key"]}`)}
              </h3>
              <p className="text-gray-600">
                {t(`features.${feature["description-key"]}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
