"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LOGO_MARK } from "@/lib/constants";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#02040A]"
        >
          <div className="absolute inset-0 aurora" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="relative flex flex-col items-center gap-8">
            {/* Orbiting rings */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 orbit" />
              <div
                className="absolute inset-3 rounded-full border border-amber-400/20"
                style={{ animation: "orbit-spin 5s linear infinite reverse" }}
              />
              <div className="absolute inset-6 rounded-full border border-purple-500/20 orbit" />

              <motion.img
                src={LOGO_MARK}
                alt="Zavro Solutions"
                className="w-28 object-contain drop-shadow-[0_0_24px_rgba(0,229,255,0.6)]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <motion.h2
                className="font-display text-2xl md:text-3xl tracking-widest gradient-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ZAVRO
              </motion.h2>
              <p className="font-mono-accent text-[11px] text-cyan-300/80">
                Initializing intelligent systems…
              </p>

              {/* Progress bar */}
              <div className="mt-3 w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
