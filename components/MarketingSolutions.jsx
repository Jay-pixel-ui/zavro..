"use client";

import { motion } from "framer-motion";
import { Target, BarChart3, Zap } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Precision Acquisition",
    desc: "The right message, in front of the right people, at the right moment.",
    stat: "3.4×",
    statLabel: "avg pipeline lift",
  },
  {
    icon: BarChart3,
    title: "Clear Attribution",
    desc: "You always know what's working — every channel, every dollar.",
    stat: "100%",
    statLabel: "tracked revenue",
  },
  {
    icon: Zap,
    title: "Compounding Output",
    desc: "Content, ads and campaigns that get sharper every month.",
    stat: "8×",
    statLabel: "output increase",
  },
];

export default function MarketingSolutions() {
  return (
    <section
      id="outcomes"
      className="relative py-28 sm:py-36"
      data-testid="marketing-solutions-section"
    >
      {/* Subtle stripes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="font-mono-accent text-[11px] text-amber-300/90">[ 06 — Outcomes ]</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
            What <span className="gradient-text">growth</span> looks like with Zavro.
          </h2>
          <p className="mt-5 text-slate-300/90 max-w-xl">
            We treat growth like infrastructure — measurable, programmable, defensible.
            Three principles guide every engagement.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="tilt-card glass rounded-2xl p-7 relative overflow-hidden"
                data-testid={`marketing-pillar-${i}`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Icon size={20} />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-3xl sm:text-4xl gradient-text">{p.stat}</p>
                    <p className="font-mono-accent text-[10px] text-slate-400 mt-1">
                      {p.statLabel}
                    </p>
                  </div>
                </div>

                <h3 className="mt-7 font-display text-xl text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.desc}</p>

                <div className="mt-6 h-px bg-gradient-to-r from-amber-400/40 via-cyan-400/30 to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
