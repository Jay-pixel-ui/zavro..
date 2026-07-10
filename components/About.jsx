"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, ShieldCheck, Globe2 } from "lucide-react";
import { IMG } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const PILLARS = [
  {
    icon: Users,
    title: "Senior Talent, Always",
    desc: "No account-manager hand-offs. The strategist who scopes your engagement is the one who runs it, end to end.",
  },
  {
    icon: TrendingUp,
    title: "Systems Over Stunts",
    desc: "We build compounding infrastructure — SEO equity, automation, brand assets — not one-off campaigns that reset to zero.",
  },
  {
    icon: ShieldCheck,
    title: "Radically Transparent",
    desc: "Live reporting, straight numbers, no vanity metrics. You always know exactly what's moving, and why.",
  },
  {
    icon: Globe2,
    title: "Singapore-Rooted, Global Reach",
    desc: "Deep APAC market fluency, built to run growth for founders operating across borders and time zones.",
  },
];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Narrative column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={fadeUp}
              className="font-mono-accent text-xs text-cyan-300/80"
              data-testid="about-eyebrow"
            >
              THE PARTNER
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              We operate like your internal team —{" "}
              <span className="gradient-text">because for many founders, we are.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-slate-300">
              Most agencies hand you a deliverable and disappear until the invoice is due. Zavro
              embeds — senior strategists, engineers and designers who treat your growth targets
              as our own, across every channel that actually moves revenue.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-slate-300">
              We're based in Singapore and built for founders operating at pace: six disciplines
              under one accountable team, with NOVA — our AI layer — keeping your systems
              compounding long after the working day ends.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["#00E5FF", "#8A2BE2", "#FFB800", "#1E90FF"].map((c, i) => (
                  <span
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-[#02040A]"
                    style={{ background: `linear-gradient(135deg, ${c}, #0D1322)` }}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-400">
                <span className="font-display text-white">47+</span> founders currently run their
                growth stack through Zavro.
              </p>
            </motion.div>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative"
          >
            <div className="border-glow tilt-card relative overflow-hidden rounded-2xl">
              <img
                src={IMG.abstract1}
                alt="Zavro growth systems in motion"
                className="h-[420px] w-full object-cover opacity-80 sm:h-[480px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/20 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="glass-strong glow-cyan absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-xl px-5 py-4 sm:block"
            >
              <p className="font-display text-2xl text-white">99.98%</p>
              <p className="mt-1 text-xs text-slate-400">Platform uptime across every client system we run.</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-24 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="tilt-card glass group rounded-2xl p-6"
              data-testid={`about-pillar-${p.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <div className="glow-cyan mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400/20">
                <p.icon size={20} />
              </div>
              <h3 className="font-display text-base text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
