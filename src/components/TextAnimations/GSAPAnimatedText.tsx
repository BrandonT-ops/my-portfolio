'use client'; // Indique que ce fichier s'exécute uniquement côté client

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GSAPAnimatedText({ text }: { text: string }) {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return <h1 ref={textRef} className="text-4xl font-bold">{text}</h1>;
}
