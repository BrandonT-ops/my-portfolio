import AnimatedText from "@/components/TextAnimations/AnimatedText";
import GSAPAnimatedText from "@/components/TextAnimations/GSAPAnimatedText";


export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <AnimatedText text="Welcome to my portfolio !" />
      <GSAPAnimatedText text="Bienvenue sur mon portfolio !" />
    </main>
  );
}
