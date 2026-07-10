"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, LineChart, HeartHandshake, Layers, Globe2 } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Modern execution, no fluff",
    desc: "We deliver work that looks premium and ships fast — no over-engineering, no agency theatre.",
  },
  {
    icon: Layers,
    title: "Full-stack growth partner",
    desc: "Brand, website, marketing, social, automation — one team, one timeline, one bill.",
  },
  {
    icon: Zap,
    title: "Built for SMEs",
    desc: "Pricing and pace that respect your runway. Senior-led work without enterprise overhead.",
  },
  {
    icon: LineChart,
    title: "Outcomes, not deliverables",
    desc: "We measure success in revenue, conversions and time saved — not slide counts.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term partnership",
    desc: "We stay close after launch — iterating, optimising and growing alongside you.",
  },
  {
    icon: Globe2,
    title: "Singapore-based, global mindset",
    desc: "Operating from Singapore, building for clients across Asia, Europe and the US.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative py-28 sm:py-36"
      data-testid="why-us-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono-accent text-[11px] text-cyan-300/90">[ 03 — Why Zavro ]</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
            Built like a startup. <br />
            <span className="gradient-text">Delivered like a studio.</span>
          </h2>
          <p className="mt-6 text-slate-300/90 max-w-md leading-relaxed">
            We're the team businesses call when they're done with template agencies
            and want work that actually moves the needle.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 px-4 py-3 rounded-2xl glass">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-mono-accent text-[10px] text-slate-300">
              Accepting <span className="text-cyan-300">3</span> new projects this quarter
            </span>
          </div>
        </motion.div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="tilt-card glass rounded-2xl p-6 group"
                data-testid={`why-reason-${i}`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 group-hover:text-amber-300 group-hover:border-amber-400/40 transition-colors">
                  <Icon size={18} />
                </div>
                <h3 className="mt-5 font-display text-base sm:text-lg text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
