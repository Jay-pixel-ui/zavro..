"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/lib/constants";

const CASES = [
  {
    tag: "FinTech",
    title: "Aurora Capital — Underwriting Co-pilot",
    desc: "Deployed a multi-agent system that pre-screens loan applications in under 90 seconds.",
    metrics: [
      { k: "Underwriting time", v: "-72%" },
      { k: "Approved volume", v: "+38%" },
    ],
    image: IMG.dashboard,
    accent: "from-cyan-400 to-blue-500",
  },
  {
    tag: "E-commerce",
    title: "Nyx Apparel — Conversion OS",
    desc: "A unified marketing + AI personalization stack across paid, owned and email channels.",
    metrics: [
      { k: "ROAS", v: "4.6×" },
      { k: "AOV uplift", v: "+24%" },
    ],
    image: IMG.abstract1,
    accent: "from-amber-300 to-orange-500",
  },
  {
    tag: "SaaS",
    title: "Helix Health — Onboarding Autopilot",
    desc: "Replaced manual customer onboarding with a guided AI flow, freeing 40 hrs/week.",
    metrics: [
      { k: "Time-to-value", v: "-58%" },
      { k: "NPS", v: "62 → 78" },
    ],
    image: IMG.workflowBg,
    accent: "from-fuchsia-400 to-purple-500",
  },
  {
    tag: "B2B Services",
    title: "Meridian Partners — Outbound Engine",
    desc: "Intent-driven outbound sequencing powered by Claude + first-party signal data.",
    metrics: [
      { k: "Meetings booked", v: "+312%" },
      { k: "Cost per SQL", v: "-46%" },
    ],
    image: IMG.abstract2,
    accent: "from-cyan-300 to-emerald-400",
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative py-28 sm:py-36"
      data-testid="case-studies-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="font-mono-accent text-[11px] text-cyan-300/90">[ 06 — Selected Work ]</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
              Quiet systems. <span className="gradient-text">Loud outcomes.</span>
            </h2>
          </div>
          <p className="font-mono-accent text-[10px] text-slate-400 sm:text-right">
            * Indicative case studies — confidentiality permitting.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08 }}
              className="group relative rounded-3xl overflow-hidden glass border border-white/10 tilt-card"
              data-testid={`case-study-${i}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/40 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full font-mono-accent text-[9px] bg-white/5 border border-white/10 text-cyan-200 backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="absolute top-4 right-4 text-white/70 group-hover:text-cyan-300 transition-colors"
                />
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="font-display text-xl sm:text-2xl text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{c.desc}</p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  {c.metrics.map((m) => (
                    <div key={m.k} className="border-l border-cyan-400/30 pl-3">
                      <p className={`font-display text-2xl bg-clip-text text-transparent bg-gradient-to-r ${c.accent}`}>
                        {m.v}
                      </p>
                      <p className="font-mono-accent text-[10px] text-slate-500 mt-0.5">
                        {m.k}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
