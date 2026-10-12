"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Send, MapPin, Mail, CheckCircle2, Clock, Lock, MessageCircle } from "lucide-react";
import { COMPANY, whatsappUrl, mailtoUrl } from "@/lib/constants";

const SERVICE_OPTIONS = [
  "AI Automation & Integrations",
  "Website Development",
  "Branding & Logo Design",
  "Marketing Solutions",
  "Social Media Management",
  "Business Consultancy",
  "Not sure yet",
];

function Magnetic({ children, strength = 16 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 280, damping: 20, mass: 0.4 });
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x: sx, y: sy }} className="inline-block w-full sm:w-auto">
      {children}
    </motion.div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-slate-400">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}

const initialForm = { name: "", email: "", company: "", service: "", message: "", website: "" };

/** Compose the enquiry into a readable message for WhatsApp / email. */
function composeEnquiry(form) {
  return [
    "New enquiry from the Zavro website",
    "",
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.company ? `Company: ${form.company}` : null,
    form.service ? `Service: ${form.service}` : null,
    "",
    "Message:",
    form.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [enquiry, setEnquiry] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Let us know who we're speaking with.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "A valid email gets you a faster reply.";
    if (!form.message.trim()) e.message = "Tell us a little about what you're building.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    const text = composeEnquiry(form);
    // Save the enquiry to the Zavro backend (best effort — WhatsApp below still opens either way).
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        message: form.service ? `[${form.service}] ${form.message.trim()}` : form.message.trim(),
        source: "website",
        website: form.website,
      }),
    }).catch(() => {});
    setEnquiry(text);
    setSent(true);
    setForm(initialForm);
    // WhatsApp is the fastest channel — open it pre-filled in a new tab.
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[860px] -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono-accent text-xs text-cyan-300/80">Get In Touch</span>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Let&apos;s find out if we&apos;re <span className="gradient-text">the right fit.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 text-pretty">
            No sales deck, no pressure. Tell us where growth is stalling and a senior strategist
            will reply within 24 hours with a straight answer — fit or no fit.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass border-glow flex flex-col justify-between rounded-2xl p-7 lg:col-span-2"
          >
            <div>
              <h3 className="font-display text-xl text-white">Direct lines</h3>
              <p className="mt-2 text-sm text-slate-400">Skip the form if you&apos;d rather reach out directly.</p>

              <div className="mt-8 space-y-5">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-cyan-300"
                  data-testid="contact-whatsapp"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <MessageCircle size={16} />
                  </span>
                  WhatsApp · {COMPANY.whatsappNumber}
                </a>
                <a
                  href={mailtoUrl("Enquiry — Zavro Solutions")}
                  className="magnetic flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-cyan-300"
                  data-testid="contact-email"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Mail size={16} />
                  </span>
                  {COMPANY.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <MapPin size={16} />
                  </span>
                  {COMPANY.location} · Remote-friendly worldwide
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Clock size={16} />
                  </span>
                  24h response window, every enquiry
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 border-t border-white/[0.06] pt-6 text-xs text-slate-500">
              <Lock size={12} />
              Your details stay confidential — reviewed only by Zavro&apos;s strategy team.
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-strong border-glow rounded-2xl p-7 lg:col-span-3 sm:p-9"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center py-16 text-center"
                data-testid="contact-success"
              >
                <span className="glow-cyan mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <CheckCircle2 size={26} />
                </span>
                <h3 className="font-display text-2xl text-white">Almost there.</h3>
                <p className="mt-2 max-w-sm text-sm text-slate-400 text-pretty">
                  We&apos;ve opened WhatsApp with your enquiry pre-filled — just hit send. Prefer
                  email? Use the button below instead.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl(enquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic rounded-xl bg-gradient-to-r from-cyan-300 to-amber-300 px-5 py-2.5 font-mono-accent text-xs text-[#02040A] shadow-[0_0_22px_rgba(0,229,255,0.35)] transition-all hover:shadow-[0_0_32px_rgba(255,184,0,0.45)]"
                    data-testid="contact-success-whatsapp"
                  >
                    Open WhatsApp again
                  </a>
                  <a
                    href={mailtoUrl("Enquiry — Zavro Solutions", enquiry)}
                    className="magnetic rounded-xl border border-cyan-400/30 px-5 py-2.5 font-mono-accent text-xs text-cyan-200 transition-all hover:border-cyan-300/70 hover:text-white"
                    data-testid="contact-success-email"
                  >
                    Send via Email
                  </a>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="magnetic mt-6 text-xs text-slate-500 underline-offset-4 transition-colors hover:text-slate-300 hover:underline"
                >
                  Write another enquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                {/* Spam trap: real visitors never see or fill this. */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={update("website")}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name}>
                    <input
                      value={form.name}
                      onChange={update("name")}
                      className="zv-input"
                      placeholder="Jane Tan"
                      autoComplete="name"
                      data-testid="contact-input-name"
                    />
                  </Field>
                  <Field label="Work email" error={errors.email}>
                    <input
                      value={form.email}
                      onChange={update("email")}
                      className="zv-input"
                      placeholder="jane@company.com"
                      type="email"
                      autoComplete="email"
                      data-testid="contact-input-email"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={update("company")}
                      className="zv-input"
                      placeholder="Company name"
                      autoComplete="organization"
                      data-testid="contact-input-company"
                    />
                  </Field>
                  <Field label="Where do you need help?">
                    <select value={form.service} onChange={update("service")} className="zv-input" data-testid="contact-input-service">
                      <option value="" className="bg-[#0D1322]">
                        Select a discipline
                      </option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#0D1322]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="What are you trying to solve?" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    className="zv-input resize-none"
                    placeholder="A sentence or two is plenty to start."
                    data-testid="contact-input-message"
                  />
                </Field>

                <Magnetic>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 via-blue-300 to-amber-300 px-6 py-3.5 font-mono-accent text-sm text-[#02040A] shadow-[0_0_28px_rgba(0,229,255,0.4)] transition-all duration-300 hover:shadow-[0_0_44px_rgba(255,184,0,0.5)] sm:w-auto"
                    data-testid="contact-submit"
                  >
                    Send via WhatsApp
                    <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Magnetic>
                <p className="text-xs text-slate-500">
                  Submitting opens WhatsApp with your enquiry pre-filled — nothing is sent until
                  you confirm.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .zv-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: #fff;
          outline: none;
          transition: all 200ms ease;
        }
        .zv-input::placeholder { color: rgba(148,163,184,0.6); }
        .zv-input:focus {
          border-color: rgba(0,229,255,0.5);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.08);
        }
      `}</style>
    </section>
  );
}
