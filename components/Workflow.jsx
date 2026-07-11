"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Megaphone, Cpu, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: Compass,
    label: "Strategy",
    desc: "Audit, positioning and a 90-day plan you can actually execute.",
  },
  {
    icon: PenTool,
    label: "Design",
    desc: "Brand and web experiences that look premium and convert.",
  },
  {
    icon: Megaphone,
    label: "Marketing",
    desc: "Campaigns and channels engineered for predictable pipeline.",
  },
  {
    icon: Cpu,
    label: "Automation",
    desc: "Smart workflows and AI that quietly reclaim your team's time.",
  },
  {
    icon: TrendingUp,
    label: "Growth",
    desc: "Measurable revenue, retention and momentum — month after month.",
  },
];

export default function Workflow() {
  return (
    <section
      id="workflow"
      className="relative py-28 sm:py-36"
      data-testid="workflow-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="font-mono-accent text-[11px] text-cyan-300/90">How We Work</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-white">
            A <span className="gradient-text">five-step</span> path from idea to outcome.
          </h2>
          <p className="mt-5 text-slate-300/90 max-w-xl">
            Calibrated, transparent and built for momentum. Every project moves
            through the same proven flight path.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-16 relative">
          {/* Animated connecting line (desktop) */}
          <div className="hidden lg:block absolute left-0 right-0 top-[64px] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
              className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-amber-400/60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative"
                  data-testid={`workflow-step-${i}`}
                >
                  {/* Glowing node */}
                  <div className="relative w-16 h-16 mx-auto rounded-full glass-strong flex items-center justify-center glow-cyan">
                    <div className="absolute inset-0 rounded-full pulse-ring" />
                    <Icon size={22} className="text-cyan-300" />
                  </div>

                  <div className="mt-6 text-center">
                    <p className="font-mono-accent text-[10px] text-amber-300/90">
                      STEP 0{i + 1}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-white">{s.label}</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Connector arrow for mobile */}
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6 mb-2">
                      <div className="w-px h-8 bg-gradient-to-b from-cyan-400/70 to-transparent" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
