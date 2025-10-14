"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import { motion, useAnimation } from "framer-motion";

import PartnersImageQahvachi from "@/public/images/qahvachi.jpg";
import PlaceCoffee from "@/public/images/place.png";
import LeafUzCoffee from "@/public/images/leaf-logo.png";
import UnionCafe from "@/public/images/union-cafe.png";
import CostaCoffee from "@/public/images/costa-coffee.png";
import Qahva from "@/public/images/qahva.png";

const partners = [
  { name: "Qahvachi", logo: PartnersImageQahvachi },
  { name: "Space Coffee", logo: PlaceCoffee },
  { name: "Leaf Uz", logo: LeafUzCoffee },
  { name: "Union Cafe", logo: UnionCafe },
  { name: "Costa Coffee", logo: CostaCoffee },
  { name: "Qahva", logo: Qahva },
  { name: "Qahvachi", logo: PartnersImageQahvachi },
  { name: "Space Coffee", logo: PlaceCoffee },
  { name: "Leaf Uz", logo: LeafUzCoffee },
  { name: "Union Cafe", logo: UnionCafe },
  { name: "Costa Coffee", logo: CostaCoffee },
  { name: "Qahva", logo: Qahva },
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
