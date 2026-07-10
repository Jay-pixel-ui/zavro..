"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LOGO_URL, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) setActive(id);
            });
          },
          { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
        );
        io.observe(el);
        return io;
      })
      .filter(Boolean);
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-6xl"
      data-testid="navbar"
    >
      <div
        className={`relative flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "glass-strong border-cyan-400/15 shadow-[0_8px_40px_rgba(0,229,255,0.08)]"
            : "glass border-white/10"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 magnetic"
          data-testid="logo-button"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden glow-cyan">
            <img src={LOGO_URL} alt="Zavro" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-[15px] tracking-[0.18em] text-white">
            ZAVRO
          </span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors magnetic"
              data-testid={`nav-${l.id}`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("contact")}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-accent rounded-xl text-[#02040A] bg-gradient-to-r from-cyan-300 to-amber-300 hover:from-cyan-200 hover:to-amber-200 transition-all duration-300 shadow-[0_0_22px_rgba(0,229,255,0.35)] hover:shadow-[0_0_32px_rgba(255,184,0,0.45)] magnetic"
            data-testid="nav-cta"
          >
            Start Project
          </button>
          <button
            className="md:hidden p-2 rounded-lg text-slate-200 hover:text-white"
            onClick={() => setOpen((o) => !o)}
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 6 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-2 rounded-2xl glass-strong p-2"
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="w-full text-left px-4 py-3 text-sm text-slate-200 hover:text-white hover:bg-white/5 rounded-xl"
                data-testid={`nav-mobile-${l.id}`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="w-full mt-1 px-4 py-3 text-sm font-mono-accent rounded-xl text-[#02040A] bg-gradient-to-r from-cyan-300 to-amber-300"
              data-testid="nav-mobile-cta"
            >
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
