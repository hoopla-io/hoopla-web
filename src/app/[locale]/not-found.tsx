"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Coffee, ArrowLeft } from "lucide-react";

export default function Custom404() {
  return (
    <div className="min-h-fit flex flex-col items-center justify-center px-4 text-main ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-60"
      >
        <Coffee className="w-24 h-24 mx-auto mb-8 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl mb-8">Looks like this brew doesn&apos;t exist.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-main text-white rounded-full hover:bg-primary transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
