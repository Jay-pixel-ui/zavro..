"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

export default function ServiceModal({ open, onClose, service }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return (
    <AnimatePresence>
      {open && service && (
        <motion.div
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="service-modal"
        >
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-[#02040A]/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl glass-strong border-glow"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all"
              data-testid="service-modal-close"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="p-7 sm:p-10">
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono-accent text-[10px] text-cyan-300">
                  0{service.index + 1} / SERVICE
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
              </div>

              <div className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-[#02040A] bg-gradient-to-br ${service.color} shadow-[0_0_28px_rgba(0,229,255,0.25)]`}
                >
                  <service.icon size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white leading-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-400">{service.tagline}</p>
                </div>
              </div>

              <p className="mt-7 text-[15px] sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.long}
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {service.deliverables.map((d) => (
                  <div
                    key={d}
                    className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 text-cyan-300 shrink-0" />
                    <span className="text-sm text-slate-200">{d}</span>
                  </div>
                ))}
              </div>

              {service.idealFor && (
                <div className="mt-8">
                  <p className="font-mono-accent text-[10px] text-slate-500 mb-3">IDEAL FOR</p>
                  <div className="flex flex-wrap gap-2">
                    {service.idealFor.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1.5 rounded-full border border-cyan-400/25 text-cyan-200 bg-cyan-400/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-mono-accent text-[#02040A] bg-gradient-to-r from-cyan-300 to-amber-300 hover:from-cyan-200 hover:to-amber-200 transition-all duration-300 shadow-[0_0_24px_rgba(0,229,255,0.35)] hover:shadow-[0_0_40px_rgba(255,184,0,0.45)] magnetic"
                  data-testid="service-modal-book"
                >
                  Book Consultation
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-mono-accent text-cyan-200 border border-cyan-400/30 hover:border-cyan-300/70 hover:text-white hover:bg-cyan-400/5 transition-all magnetic"
                  data-testid="service-modal-discuss"
                >
                  Discuss Project
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
