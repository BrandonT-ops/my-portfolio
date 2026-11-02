import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import About from "@/components/home/About";
import Photography from "@/components/home/Photography";
import Contact from "@/components/home/Contact";
import Marquee from "@/components/motion/Marquee";

const DOING = [
  "Frontend engineering",
  "Full-stack products",
  "UI / UX design",
  "APIs & infrastructure",
  "Teaching & community",
  "Photography",
] as const;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        items={DOING}
        className="relative z-10 -rotate-1 scale-[1.02] border-y-2 border-ink bg-accent py-5 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-medium tracking-[-0.02em] text-paper"
      />
      <Work />
      <About />
      <Photography />
      <Contact />
    </>
  );
}
