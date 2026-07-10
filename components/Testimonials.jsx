"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 sm:py-36"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="font-mono-accent text-[11px] text-cyan-300/90">[ 07 — Testimonials ]</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white text-balance">
            Trusted by teams who <span className="gradient-text">ship</span>.
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="tilt-card glass rounded-2xl p-6 sm:p-7 relative"
              data-testid={`testimonial-${i}`}
            >
              {t.sample && (
                <span className="sr-only">Sample testimonial for illustration purposes</span>
              )}
              <Quote
                size={22}
                aria-hidden="true"
                className="text-cyan-300/70 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]"
              />
              <blockquote className="mt-4 text-[15px] sm:text-base text-slate-200 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-400/20 to-amber-300/20 font-mono-accent text-[11px] text-cyan-100"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm text-white font-medium">{t.name}</p>
                  <p className="font-mono-accent text-[10px] text-slate-400">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
