"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Globe2, Palette, Megaphone, Share2, Compass, ArrowUpRight, Zap, MessageSquareText } from "lucide-react";
import ServiceModal from "./ServiceModal";

const SERVICES = [
  {
    icon: Bot,
    title: "AI Automation & Integrations",
    tagline: "Systems that work while you sleep.",
    short:
      "Custom AI agents and workflow automation that quietly remove hours from your team's week — and errors from your pipeline.",
    long: "We design and ship the AI infrastructure most agencies only talk about — lead-qualification agents, CRM and workflow automations, internal copilots, and integrations that connect your existing stack into one system. Built to run unattended, monitored, and improved monthly.",
    deliverables: [
      "Custom AI agent development",
      "Workflow & CRM automation",
      "Third-party API integrations",
      "Internal copilot tooling",
      "Monthly performance tuning",
    ],
    idealFor: ["Founders drowning in manual ops", "Teams scaling without headcount", "Fragmented tool stacks"],
    color: "from-cyan-400 to-blue-500",
    featured: true,
  },
  {
    icon: Globe2,
    title: "Website Development",
    tagline: "Engineered to convert, not just impress.",
    short: "Fast, conversion-obsessed builds on modern stacks — designed to hold up under real traffic and scrutiny.",
    long: "From marketing sites to full product builds, we engineer for speed, SEO and conversion from day one — not as an afterthought. Every build ships with performance budgets, analytics, and a CMS your team can actually use.",
    deliverables: ["Custom web design & build", "Performance & SEO engineering", "CMS & content architecture", "Post-launch support"],
    idealFor: ["Founders launching or relaunching", "Teams outgrowing template sites"],
    color: "from-blue-400 to-cyan-300",
  },
  {
    icon: Palette,
    title: "Branding & Logo Design",
    tagline: "Identity that earns trust before you say a word.",
    short: "Logo systems and visual identity built to read as premium at first glance — and hold up everywhere.",
    long: "Your brand is doing business development before your team ever picks up the phone. We build full identity systems — logo, typography, color, voice and guidelines — designed to signal credibility to the exact buyer you're trying to win.",
    deliverables: ["Logo & visual identity system", "Brand guidelines & assets", "Typography & color systems", "Pitch deck & collateral templates"],
    idealFor: ["Founders rebranding for their next raise", "Businesses outgrowing a DIY identity"],
    color: "from-purple-400 to-blue-400",
  },
  {
    icon: Megaphone,
    title: "Marketing Solutions",
    tagline: "Demand generation, engineered like infrastructure.",
    short: "Paid, SEO and lifecycle marketing built around one number: pipeline. No vanity dashboards.",
    long: "We run marketing as a growth engine, not a media-buying line item — paid acquisition, SEO, content and lifecycle email working together against one shared pipeline target, reported weekly in plain numbers.",
    deliverables: ["Paid acquisition (Meta/Google/LinkedIn)", "SEO & content strategy", "Lifecycle & email marketing", "Weekly performance reporting"],
    idealFor: ["Founders past the friends-and-family stage", "CMOs consolidating fragmented agencies"],
    color: "from-amber-300 to-purple-400",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    tagline: "Presence that compounds, not just posts.",
    short: "Strategy-led content and community management that builds real audience equity.",
    long: "We treat social as a distribution and trust-building channel, not a content quota. Strategy, creative production, community management and analytics — built around the audience your business actually needs to reach.",
    deliverables: ["Content strategy & calendar", "Creative production", "Community management", "Analytics & audience insights"],
    idealFor: ["Founders building a personal or company brand", "Teams needing consistent presence"],
    color: "from-cyan-300 to-purple-400",
  },
  {
    icon: Compass,
    title: "Business Consultancy",
    tagline: "A senior second opinion on every growth bet.",
    short: "Strategic consulting for leaders making high-stakes calls on positioning, pricing and go-to-market.",
    long: "Sometimes the highest-leverage move isn't another campaign — it's the right strategic call. We work directly with founders and leadership teams on positioning, GTM strategy, and operational growth planning, grounded in what we see working across our client base.",
    deliverables: ["Growth & GTM strategy sessions", "Positioning & pricing review", "Operational growth planning", "Quarterly strategy check-ins"],
    idealFor: ["Founders at a strategic inflection point", "Leadership teams planning their next phase"],
    color: "from-amber-400 to-cyan-300",
  },
].map((s, index) => ({ ...s, index }));

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
};

function ServiceCard({ service, onOpen }) {
  const Icon = service.icon;
  return (
    <motion.button
      variants={cardIn}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(service)}
      data-testid={`service-card-${service.index}`}
      className={`tilt-card border-glow group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.02] p-6 text-left ${
        service.featured ? "sm:p-8" : ""
      }`}
    >
      {service.featured && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,229,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.4) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div
            className={`flex items-center justify-center rounded-2xl bg-gradient-to-br text-[#02040A] ${service.color} ${
              service.featured ? "h-14 w-14" : "h-11 w-11"
            } shadow-[0_0_24px_rgba(0,229,255,0.25)]`}
          >
            <Icon size={service.featured ? 26 : 20} />
          </div>
          {service.featured && (
            <span className="font-mono-accent flex items-center gap-1 rounded-full border border-cyan-400/30 px-2.5 py-1 text-[9px] text-cyan-200">
              <Zap size={10} /> MOST REQUESTED
            </span>
          )}
        </div>

        <h3
          className={`font-display mt-5 text-white ${
            service.featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {service.title}
        </h3>
        <p className={`mt-2 text-cyan-200/80 ${service.featured ? "text-sm" : "text-xs"}`}>{service.tagline}</p>
        <p
          className={`mt-3 leading-relaxed text-slate-400 ${
            service.featured ? "max-w-md text-sm" : "text-[13px]"
          }`}
        >
          {service.short}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center gap-1.5 font-mono-accent text-[10px] text-slate-500 transition-colors group-hover:text-cyan-300">
        VIEW DETAILS
        <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.button>
  );
}

export default function Services() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const openService = (service) => {
    setSelected(service);
    setOpen(true);
  };

  const [featured, ...rest] = SERVICES;

  return (
    <section id="services" data-testid="services-section" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[380px] w-[380px] rounded-full bg-purple-500/[0.08] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono-accent text-[11px] text-cyan-300/90">Our Services</span>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            One team. <span className="gradient-text">Six disciplines.</span> Zero hand-offs.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400">
            Every engagement draws from the same senior bench — so your website, brand, marketing
            and AI systems are built to work as one machine, not six invoices.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-6 md:auto-rows-[190px]"
        >
          {/* Featured tile — spans 4 cols x 2 rows */}
          <div className="md:col-span-4 md:row-span-2">
            <ServiceCard service={featured} onOpen={openService} />
          </div>

          {/* Two medium tiles stacked beside the featured tile */}
          {rest.slice(0, 2).map((s) => (
            <div key={s.title} className="md:col-span-2 md:row-span-1">
              <ServiceCard service={s} onOpen={openService} />
            </div>
          ))}

          {/* Three even tiles */}
          {rest.slice(2).map((s) => (
            <div key={s.title} className="md:col-span-2 md:row-span-1">
              <ServiceCard service={s} onOpen={openService} />
            </div>
          ))}

          {/* Grid-native CTA banner */}
          <motion.div
            variants={cardIn}
            className="glow-cyan relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0D1322] via-[#0A1830] to-[#0D1322] p-7 md:col-span-6 md:row-span-1"
          >
            <div className="aurora opacity-40" />
            <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="pulse-ring relative flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <MessageSquareText size={20} />
                </div>
                <div>
                  <p className="font-display text-lg text-white">Not sure which discipline fits?</p>
                  <p className="mt-0.5 text-sm text-slate-400">
                    Ask NOVA — or get a senior strategist's read, free.
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-3 sm:w-auto">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("zavro:open-chat"))}
                  data-testid="services-cta-chat"
                  className="magnetic flex-1 rounded-xl border border-cyan-400/30 px-5 py-3 font-mono-accent text-xs text-cyan-200 transition-all hover:border-cyan-300/70 hover:bg-cyan-400/5 hover:text-white sm:flex-none"
                >
                  Chat with NOVA
                </button>
                <a
                  href="#contact"
                  data-testid="services-cta-audit"
                  className="magnetic flex-1 rounded-xl bg-gradient-to-r from-cyan-300 to-amber-300 px-5 py-3 text-center font-mono-accent text-xs text-[#02040A] shadow-[0_0_22px_rgba(0,229,255,0.35)] transition-all hover:shadow-[0_0_36px_rgba(255,184,0,0.45)] sm:flex-none"
                >
                  Book Free Audit
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <ServiceModal open={open} onClose={() => setOpen(false)} service={selected} />
    </section>
  );
}
