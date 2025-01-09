"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/Form/input";
import { Textarea } from "@/components/Form/textarea";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = useTranslations();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically send the form data to your backend
    // console.log("Form submitted:", formState);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden">
      <h2 className="text-2xl font-bold text-main mb-6">
        {t("contacts.contact-us")}
      </h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("contacts.name")}
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("contacts.email")}
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("contacts.message")}
            </label>
            <Textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-main text-white py-2 px-4 rounded-md disabled:opacity-50 hover:bg-primary transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <svg
            className="mx-auto h-12 w-12 text-main"
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
          <h3 className="mt-2 text-xl font-medium text-gray-900">
            {t("contacts.success")}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t("contacts.success-subtitle")}
          </p>
        </motion.div>
      )}
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-primary opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary opacity-10 rounded-full translate-x-1/4 translate-y-1/4"></div>
    </div>
  );
}
