import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Photography from '@/components/sections/Photography';
import Hobbies from '@/components/sections/Hobbies';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Photography />
      <Hobbies />
      <Services />
      <Contact />
    </main>
  );
}
