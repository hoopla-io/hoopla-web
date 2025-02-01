"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import CupImage3D from "@/public/images/cup-3d.webp";
// import CupImage3D2 from "@/public/images/cup-3d-2.webp";
// import CupImage3D3 from "@/public/images/cup-3d-3.webp";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Squares from "@/components/Squares/Squares";

const SubscriptionPlans = () => {
  const t = useTranslations();

  const plans = [
    {
      name: t("subscriptions.subscription-1.title"),
      description: t("subscriptions.subscription-1.description"),
      price: t("subscriptions.subscription-1.price"),
      features: [
        t("subscriptions.subscription-1.features.0"),
        t("subscriptions.subscription-1.features.1"),
        t("subscriptions.subscription-1.features.2"),
        t("subscriptions.subscription-1.features.3"),
      ],
      image: CupImage3D,
    },
    // {
    //   name: t("subscriptions.subscription-2.title"),
    //   description: t("subscriptions.subscription-2.description"),
    //   price: t("subscriptions.subscription-2.price"),
    //   features: [
    //     t("subscriptions.subscription-2.features.0"),
    //     t("subscriptions.subscription-2.features.1"),
    //     t("subscriptions.subscription-2.features.2"),
    //     t("subscriptions.subscription-2.features.3"),
    //   ],
    //   image: CupImage3D2,
    // },
    {
      name: t("subscriptions.subscription-3.title"),
      description: t("subscriptions.subscription-3.description"),
      price: t("subscriptions.subscription-3.price"),
      features: [
        t("subscriptions.subscription-3.features.0"),
        t("subscriptions.subscription-3.features.1"),
        t("subscriptions.subscription-3.features.2"),
        t("subscriptions.subscription-3.features.3"),
      ],
      image: CupImage3D,
    },
  ];

  return (
    <section className="py-16 bg-main text-white relative" id="plans">
      <Squares
        speed={0.4}
        squareSize={30}
        direction="diagonal" // up, down, left, right, diagonal
        // borderColor="#fff"
        hoverFillColor="#222"
        className="absolute top-0 left-0 w-full h-full opacity-20"
      />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
          {t("subscriptions.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-3xl p-8 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="absolute -top-8 -right-4 w-32 h-32 hidden xl:block"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src={plan.image}
                  alt={plan.name}
                  layout="fill"
                  objectFit="contain"
                  className="transform transition-transform duration-300 group-hover:scale-110 relative"
                />
              </motion.div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold tracking-wider">
                  {plan.name}
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-extrabold font-eugusto">
                    {plan.price}
                  </span>
                </div>
                <p className="text-gray-500">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-2 text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <Check className="min-w-4 max-w-4 sm:min-w-5 sm:max-w-5" />
                      <p className="text-sm sm:text-base">{feature}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-main/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-main/50 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
