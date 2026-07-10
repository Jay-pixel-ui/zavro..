"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { IMG, NOVA } from "@/lib/constants";

const QUICK_PROMPTS = ["Website Development", "Branding", "Marketing", "Social Media", "Automation", "Book Consultation"];
const SERVICE_KEYWORDS = ["website development", "branding", "marketing", "social media", "automation"];
const THINKING_LABELS = ["Consulting the playbook…", "Crunching the numbers…", "Lining up the angle…", "One moment…"];

function Magnetic({ children, strength = 14, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

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
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AIChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: NOVA.greeting }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinkingLabel, setThinkingLabel] = useState(THINKING_LABELS[0]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Cross-component open trigger (e.g. Services' "Chat with NOVA" tile)
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("zavro:open-chat", openHandler);
    return () => window.removeEventListener("zavro:open-chat", openHandler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    if (msg.toLowerCase() === "book consultation") {
      setMessages((m) => [
        ...m,
        { role: "user", text: msg },
        { role: "assistant", text: "Great — opening the contact form. Drop your details and a senior strategist will reach out within 24h." },
      ]);
      setInput("");
      setTimeout(() => {
        setOpen(false);
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 900);
      return;
    }

    const expanded = SERVICE_KEYWORDS.includes(msg.toLowerCase())
      ? `Tell me about Zavro's ${msg} service in 2 short sentences.`
      : msg;

    const nextMessages = [...messages, { role: "user", text: msg }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setThinkingLabel(THINKING_LABELS[Math.floor(Math.random() * THINKING_LABELS.length)]);

    try {
      // Send prior turns plus the (possibly expanded) latest message. The
      // greeting is skipped — it's presentation copy, not conversation state.
      const payload = [
        ...nextMessages.slice(1, -1).map((m) => ({ role: m.role, text: m.text })),
        { role: "user", text: expanded },
      ];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "NOVA is briefly offline. Please try again, or reach us directly on WhatsApp at +65 8980 5150 or zavroai@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Magnetic strength={12} className="fixed bottom-6 right-6 z-[120]">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.4, type: "spring", stiffness: 280, damping: 20 }}
          onClick={() => setOpen((o) => !o)}
          className="magnetic relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_0_40px_rgba(0,229,255,0.45)] transition-shadow hover:shadow-[0_0_60px_rgba(0,229,255,0.65)] sm:h-16 sm:w-16"
          style={{ background: "conic-gradient(from 0deg, #00E5FF, #1E90FF, #8A2BE2, #FFB800, #00E5FF)" }}
          data-testid="ai-chat-toggle"
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
          aria-expanded={open}
        >
          <span className="absolute inset-[3px] flex items-center justify-center rounded-full bg-[#02040A]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? <X size={22} /> : <MessageSquare size={22} />}
              </motion.span>
            </AnimatePresence>
          </span>
          {!open && <span className="pulse-ring absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />}
        </motion.button>
      </Magnetic>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="glass-strong border-glow fixed bottom-24 right-4 z-[120] flex h-[560px] max-h-[80vh] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl sm:right-6"
            data-testid="ai-chat-panel"
            role="dialog"
            aria-label="NOVA AI assistant chat"
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
              <div className="relative">
                <img src={IMG.aiAvatar} alt={NOVA.name} className="h-9 w-9 rounded-full border border-cyan-400/40 object-cover" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0D1322] bg-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm tracking-wide text-white">{NOVA.name}</p>
                <p className="font-mono-accent text-[9px] text-cyan-300/80">Zavro AI Strategist · {NOVA.status}</p>
              </div>
              <Sparkles size={14} className="text-cyan-300/50" />
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scroll-smooth" aria-live="polite">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-gradient-to-br from-cyan-300/90 to-amber-300/90 text-[#02040A]"
                        : "rounded-bl-md border border-white/10 bg-white/5 text-slate-100"
                    }`}
                    data-testid={`chat-msg-${i}`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-3.5 py-2.5">
                    <span className="flex gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" style={{ animationDelay: "0.2s" }} />
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" style={{ animationDelay: "0.4s" }} />
                    </span>
                    <span className="text-[10px] text-slate-400">{thinkingLabel}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 px-3 pb-1 pt-2">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={loading}
                  className="rounded-full border border-cyan-400/25 px-2.5 py-1.5 text-[11px] text-cyan-200 transition-all hover:border-cyan-300/60 hover:bg-cyan-400/5 hover:text-white disabled:opacity-50"
                  data-testid={`chat-quick-${q.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-white/5 p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask NOVA…"
                maxLength={1000}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/10"
                data-testid="chat-input"
                aria-label="Message NOVA"
              />
              <Magnetic strength={10}>
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="magnetic flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-amber-300 text-[#02040A] shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-shadow hover:shadow-[0_0_28px_rgba(255,184,0,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="chat-send"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </Magnetic>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
