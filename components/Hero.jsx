"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Globe2, Megaphone, Bot } from "lucide-react";
import { IMG } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Magnetic wrapper — real cursor-attraction physics (spring-eased), not just
// a CSS hover transition. Self-contained so this file stays copy-paste ready.
// ---------------------------------------------------------------------------
function Magnetic({ children, strength = 24, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * strength);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Count-up primitive for the console's live metrics.
// ---------------------------------------------------------------------------
function CountUp({ target, decimals = 0, suffix = "", duration = 1.7, delay = 0.9 }) {
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    const controls = animate(mv, target, {
      duration,
      delay,
      ease: [0.16, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const SIGNALS = [
  { icon: Globe2, label: "Web & Brand", pct: 92 },
  { icon: Megaphone, label: "Marketing", pct: 87 },
  { icon: Bot, label: "AI Automation", pct: 96 },
];

export default function Hero() {
  const panelRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });
  const sheenX = useTransform(sry, [-8, 8], [0, 100]);

  const handlePanelMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 16);
    rx.set(py * -16);
  };
  const handlePanelLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#02040A] pt-28 pb-20 sm:pt-32"
    >
      {/* Ambient layers */}
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-160px] right-[-120px] h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[130px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        {/* ------------------------------------------------------------- */}
        {/* Copy column                                                   */}
        {/* ------------------------------------------------------------- */}
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div
            variants={rise}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            data-testid="hero-badge"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono-accent text-[10px] text-cyan-100/90">
              Singapore · AI‑Native Growth Partner
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4rem]"
          >
            Growth isn't luck.
            <br />
            It's{" "}
            <span className="gradient-text text-glow-cyan">engineering.</span>
          </motion.h1>

          <motion.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Zavro is the senior growth partner behind founders and CMOs building for the next
            decade — brand, web, marketing and AI automation engineered as{" "}
            <span className="text-white">one compounding system</span>, not six disconnected
            vendors.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#contact"
                data-testid="hero-cta-primary"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 via-blue-300 to-amber-300 px-7 py-3.5 font-mono-accent text-sm text-[#02040A] shadow-[0_0_28px_rgba(0,229,255,0.45)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(255,184,0,0.55)] magnetic"
              >
                <span className="relative z-10">Request a Growth Audit</span>
                <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="shimmer absolute inset-0" />
              </a>
            </Magnetic>

            <Magnetic strength={16}>
              <a
                href="#case-studies"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 px-7 py-3.5 font-mono-accent text-sm text-cyan-200 transition-all duration-300 hover:border-cyan-300/70 hover:bg-cyan-400/5 hover:text-white magnetic"
              >
                <Sparkles size={15} />
                Explore Our Work
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-6 font-mono-accent text-[11px] text-slate-400"
          >
            <span>
              <span className="text-white">84</span> Projects Shipped
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>
              <span className="text-white">320</span> Automations Live
            </span>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>
              <span className="text-white">47+</span> Founders Trust Zavro
            </span>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* Visual column — bespoke "growth console", no static image      */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={panelRef}
            onMouseMove={handlePanelMove}
            onMouseLeave={handlePanelLeave}
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            className="glass-strong border-glow float-slow relative overflow-hidden rounded-2xl"
            data-testid="hero-console"
          >
            {/* sheen sweep */}
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background: useTransform(
                  sheenX,
                  (v) => `linear-gradient(115deg, transparent ${v - 20}%, rgba(0,229,255,0.14) ${v}%, transparent ${v + 20}%)`
                ),
              }}
            />

            {/* console header */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono-accent text-[10px] text-slate-400">
                zavro // growth-os
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono-accent text-[9px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                LIVE
              </span>
            </div>

            <div className="space-y-5 p-6">
              {/* metric tiles */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="font-mono-accent text-[9px] text-slate-400">Pipeline Velocity</p>
                  <p className="font-display mt-1 text-2xl text-white">
                    +<CountUp target={128} suffix="%" />
                  </p>
                  <div className="mt-3 flex items-end gap-1 h-8">
                    {[40, 55, 48, 70, 62, 84, 96].map((h, i) => (
                      <motion.span
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.07, duration: 0.6, ease: "easeOut" }}
                        className="w-full rounded-sm bg-gradient-to-t from-cyan-400/40 to-cyan-300"
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="font-mono-accent text-[9px] text-slate-400">Automations Live</p>
                  <p className="font-display mt-1 text-2xl text-white">
                    <CountUp target={320} delay={1.1} />
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Zap size={12} className="text-amber-300" />
                    <span className="text-[10px] text-slate-400">All systems nominal</span>
                  </div>
                </div>
              </div>

              {/* channel signal bars */}
              <div className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                {SIGNALS.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <s.icon size={13} className="shrink-0 text-cyan-300" />
                    <span className="w-24 shrink-0 text-[10px] text-slate-400">{s.label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.pct}%` }}
                        transition={{ delay: 1.3 + i * 0.15, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-amber-300"
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right font-mono-accent text-[9px] text-slate-500">
                      {s.pct}%
                    </span>
                  </div>
                ))}
              </div>

              {/* NOVA teaser chip */}
              <div className="flex items-center gap-2.5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] px-4 py-3">
                <img src={IMG.aiAvatar} alt="NOVA" className="h-6 w-6 rounded-full" />
                <span className="text-[11px] text-cyan-100">NOVA · AI Strategist</span>
                <span className="pulse-ring relative ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          </motion.div>

          {/* floating accent badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="glass glow-gold absolute -left-6 -bottom-6 hidden rounded-xl px-4 py-3 sm:block"
          >
            <p className="font-mono-accent text-[9px] text-amber-200">Client Retention</p>
            <p className="font-display text-lg text-white">
              <CountUp target={99.98} decimals={2} suffix="%" delay={1.7} />
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 hover:text-cyan-300 transition-colors sm:flex"
      >
        <span className="font-mono-accent text-[9px]">SCROLL</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
