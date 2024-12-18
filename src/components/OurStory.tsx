"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CoffeeEnjoyImage from "@/public/images/coffee-enjoy.jpg";
import { useTranslations } from "next-intl";

const OurStory = () => {
  const t = useTranslations();

  return (
    <section className="py-16 bg-main text-white" id="our-story">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-2 xl:flex-row justify-between">
          <motion.div
            className="mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t("our-story.title")}</h2>
            <p className="mb-4">{t("our-story.part-1")}</p>
            <p className="mb-4">{t("our-story.part-2")}</p>
            <p>{t("our-story.part-3")}</p>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              src={CoffeeEnjoyImage}
              alt="Coffee farm"
              width={900}
              height={600}
              className="rounded-sm shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
