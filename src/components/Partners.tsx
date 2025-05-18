"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
// import PartnersImageSAFIA from "@/public/images/safia-logo.webp";
// import PartnersImageCapito from "@/public/images/capito.webp";
// import PartnersImageCucucina from "@/public/images/cucucina.webp";
// import PartnersImageDipndip from "@/public/images/dipndip.webp";
// import PartnersImageCaffelito from "@/public/images/caffelito.webp";
import PartnersImageAROMA from "@/public/images/aroma-coffee.webp";
import PartnersImageQahvachi from "@/public/images/qahvachi.jpg";
import SpaceCoffee from "@/public/images/space-coffee.png";
import { useTranslations } from "next-intl";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const partners = [
  { name: "Qahvachi", logo: PartnersImageQahvachi },
  { name: "Aroma Coffee", logo: PartnersImageAROMA },
  { name: "Space Coffee", logo: SpaceCoffee },
  { name: "Qahvachi", logo: PartnersImageQahvachi },
  { name: "Aroma Coffee", logo: PartnersImageAROMA },
  { name: "Space Coffee", logo: SpaceCoffee },
  // { name: "Eco Farms", logo: PartnersImageSAFIA },
  // { name: "Capito", logo: PartnersImageCapito },
  // { name: "Cucucina", logo: PartnersImageCucucina },
  // { name: "Dipndip", logo: PartnersImageDipndip },
  // { name: "Caffelito", logo: PartnersImageCaffelito },
  // { name: "Organic Growers", logo: PartnersImageSAFIA },
  // { name: "Sustainable Roasters", logo: PartnersImageAROMA },
  // { name: "Capito 2", logo: PartnersImageCapito },
  // { name: "Cucucina 2", logo: PartnersImageCucucina },
  // { name: "Dipndip 2", logo: PartnersImageDipndip },
  // { name: "Caffelito 2", logo: PartnersImageCaffelito },
  // { name: "Sustainable Brew", logo: PartnersImageSAFIA },
  // { name: "Coffee Connoisseurs", logo: PartnersImageAROMA },
  // { name: "Capito 3", logo: PartnersImageCapito },
  // { name: "Cucucina 3", logo: PartnersImageCucucina },
  // { name: "Dipndip 3", logo: PartnersImageDipndip },
  // { name: "Caffelito 3", logo: PartnersImageCaffelito },
];

const Partners = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();
  const mountedRef = useRef(false);

  const t = useTranslations();

  useEffect(() => {
    mountedRef.current = true;

    const animateSlider = async () => {
      if (!mountedRef.current) return;

      await controls.start({
        x: "-100%",
        transition: { duration: 100, ease: "linear" },
      });

      if (mountedRef.current) {
        controls.set({ x: "0%" });
        animateSlider();
      }
    };

    animateSlider();

    return () => {
      mountedRef.current = false;
      controls.stop();
    };
  }, [controls]);

  return (
    <section className="py-16" id="partners">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-coffee-brown text-center mb-12">
          {t("partners.title")}
        </h2>
        <div className="relative mx-auto">
          <div className="overflow-hidden">
            <motion.div
              ref={containerRef}
              className="flex space-x-8 justify-center items-center"
              animate={controls}
              style={{ width: `${partners.length * 200}px` }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 w-40 p-8 rounded-md relative bg-[#FBAB7E] bg-[linear-gradient(62deg,_#FBAB7E_0%,_#F7CE68_100%)]"
                >
                  <AspectRatio ratio={1}>
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      layout="fill"
                      className="max-w-full h-auto"
                    />
                  </AspectRatio>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.p
          className="text-center mt-12 text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {t("partners.description")}
        </motion.p>
      </div>
    </section>
  );
};

export default Partners;
