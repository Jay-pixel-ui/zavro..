"use client";

import { Instagram, Facebook, Github, Mail, MessageCircle } from "lucide-react";
import { LOGO_URL, COMPANY, NAV_LINKS, SOCIAL_LINKS, CONTACT_LINKS } from "@/lib/constants";

const ICONS = { instagram: Instagram, facebook: Facebook, github: Github, mail: Mail, whatsapp: MessageCircle };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#02040A] pt-20 pb-8" data-testid="footer">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.05] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="magnetic inline-flex items-center gap-2.5">
              <img src={LOGO_URL} alt={COMPANY.name} className="h-10 w-10 object-contain" />
              <span className="font-display text-lg">
                <span className="text-white">ZAVRO</span>{" "}
                <span className="gradient-text">SOLUTIONS</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">{COMPANY.short}</p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="magnetic flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-slate-400 transition-all hover:border-cyan-400/40 hover:text-cyan-300"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-mono-accent text-[11px] text-slate-500">NAVIGATE</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-sm text-slate-400 transition-colors hover:text-cyan-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-accent text-[11px] text-slate-500">GET IN TOUCH</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-cyan-300">
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyan-300"
                >
                  WhatsApp · {COMPANY.whatsappNumber}
                </a>
              </li>
              <li>{COMPANY.location}</li>
              <li>
                <a href="#contact" className="transition-colors hover:text-cyan-300">
                  Request a Growth Audit →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 text-xs text-slate-500 sm:flex-row">
          <p>© {year} {COMPANY.legalName}. All rights reserved.</p>
          <p className="font-mono-accent text-[10px] text-slate-600">Engineered in Singapore.</p>
        </div>
      </div>
    </footer>
  );
}
