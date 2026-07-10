"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import LoadingScreen from "@/components/LoadingScreen";
import NeuralBackground from "@/components/NeuralBackground";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Workflow from "@/components/Workflow";
import MarketingSolutions from "@/components/MarketingSolutions";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatBubble from "@/components/AIChatBubble";

// Boot sequence duration mirrors LoadingScreen's own internal timer (2.2s
// visible + ~0.6s exit fade). Kept in one place so HomeShell can gate body
// scroll and stagger the reveal without LoadingScreen needing a callback prop.
const BOOT_MS = 2200;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed top-0 left-0 z-[150] h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400"
    />
  );
}

export default function HomeShell() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      document.body.style.overflow = "";
      setBooted(true);
    }, BOOT_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <NeuralBackground />
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <Workflow />
          <MarketingSolutions />
          <CaseStudies />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <AIChatBubble />
      </motion.div>
    </>
  );
}
