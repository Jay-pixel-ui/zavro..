// lib/constants.js
// Single source of truth for brand identity, contact details, navigation,
// social links, and shared assets. Update once — every surface follows.

// Official Zavro Solutions brand marks, cropped from the master logo.
// LOGO_MARK  → the ZS monogram, used where space is tight (navbar, loader).
// LOGO_FULL  → the full stacked lockup with wordmark + tagline (footer).
// LOGO_URL   → default alias (monogram) for back-compat.
export const LOGO_MARK = "/images/logo-mono.png";
export const LOGO_FULL = "/images/logo-full.png";
export const LOGO_URL = LOGO_MARK;

export const COMPANY = {
  name: "Zavro Solutions",
  legalName: "Zavro Solutions Pte Ltd",
  tagline: "Engineered Growth. Quietly Inevitable.",
  short:
    "A Singapore-based growth and IT partner for founders and CMOs who've outgrown 'good enough' — website, brand, marketing, and AI systems built to compound.",
  email: "zavroai@gmail.com",
  location: "Singapore",
  whatsappNumber: "+65 8980 5150",
  // Digits-only form used to build wa.me links.
  whatsappDigits: "6589805150",
  businessHours: "Monday to Friday, 9am to 6pm Singapore time (GMT+8). Enquiries answered within 24 hours.",
};

export const CONTACT_LINKS = {
  whatsapp: `https://wa.me/${COMPANY.whatsappDigits}`,
  email: `mailto:${COMPANY.email}`,
};

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappUrl(message) {
  const base = `https://wa.me/${COMPANY.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Build a mailto link with a pre-filled subject and body. */
export function mailtoUrl(subject, body) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${COMPANY.email}${qs ? `?${qs}` : ""}`;
}

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Us" },
  { id: "workflow", label: "Process" },
  { id: "case-studies", label: "Work" },
  { id: "contact", label: "Contact" },
];

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/zavroai", icon: "instagram" },
  { name: "Facebook", href: "https://www.facebook.com/share/1RKVb79yyz/", icon: "facebook" },
  { name: "GitHub", href: "https://github.com/Jay-pixel-ui", icon: "github" },
  { name: "WhatsApp", href: CONTACT_LINKS.whatsapp, icon: "whatsapp" },
  { name: "Email", href: CONTACT_LINKS.email, icon: "mail" },
];

// NOVA — the AI growth strategist. Keep persona copy centralized so the chat
// widget and any future surface (landing sections, emails) stay in sync.
export const NOVA = {
  name: "NOVA",
  role: "AI Growth Strategist",
  status: "Online",
  greeting:
    "I'm NOVA — Zavro's AI growth strategist. Ask me about automation, brand, or what a senior partner would do with your growth budget.",
};

export const IMG = {
  heroBg: "/images/hero-bg.svg",
  workflowBg: "/images/workflow-bg.svg",
  dashboard: "/images/dashboard-preview.svg",
  aiAvatar: "/images/ai-avatar.svg",
  abstract1: "/images/abstract-neural-1.png",
  abstract2: "/images/abstract-neural-2.png",
};
