import AnimatedText from "@/components/TextAnimations/AnimatedText";
import GSAPAnimatedText from "@/components/TextAnimations/GSAPAnimatedText";


export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col">
      <AnimatedText text="Welcome to my portfolio !" />
      <GSAPAnimatedText text="Welcome to my portfolio !" />
      </div>
    
    </main>
  );
}
