"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = useTranslations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Newsletter subscription:", email);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="mt-16 bg-main text-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{t("newsletter.title")}</h2>
      <p className="mb-6">{t("newsletter.description")}</p>
      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row md:gap-0 gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletter.placeholder")}
            required
            className="flex-grow px-4 py-2 rounded-sm md:rounded-l-md text-main focus:outline-none focus:ring-2 focus:ring-main"
          />
          <motion.button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-sm md:rounded-r-md transition-colors duration-300"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("newsletter.button")}
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <svg
            className="mx-auto h-12 w-12 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="mt-2 text-xl">Thank you for subscribing!</p>
        </motion.div>
      )}
      <p className="mt-4 text-sm text-white/80">
        {t("newsletter.time")}
      </p>
    </div>
  );
}
