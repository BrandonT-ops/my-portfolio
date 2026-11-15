import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import Numbers from "@/components/home/Numbers";
import About from "@/components/home/About";
import Experience from "@/components/home/Experience";
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
      <div className="relative z-10 overflow-x-clip">
        <Marquee
          items={DOING}
          className="-rotate-1 scale-[1.02] border-y-2 border-ink bg-paper py-5 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-medium tracking-[-0.02em] text-ink"
        />
      </div>
      <Work />
      <Numbers />
      <About />
      <Experience />
      <Photography />
      <Contact />
    </>
  );
}
