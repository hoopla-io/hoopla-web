"use client";

import { motion } from "framer-motion";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-fit flex flex-col items-center justify-center px-4 text-main ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-60"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            delay: 0,
            duration: 2,
          }}
        >
          <Loader className="w-16 h-16 mx-auto mb-8 text-primary" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Wait a minute</h1>
        <p className="text-xl mb-8">Looks like loading is taking longer.</p>
      </motion.div>
    </div>
  );
}
