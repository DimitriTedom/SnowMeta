
import { Header } from "@/components/Header";
import { InputForm } from "@/components/InputForm";
import { ResultSection } from "@/components/ResultSection";
import { useAppSelector } from "@/hooks/redux";

const Index = () => {
  const { status } = useAppSelector((state) => state.generator);
  const isLoading = status === 'loading';

  return (
    <div className={`min-h-screen flex flex-col ${isLoading ? 'animate-pulse-slow' : ''}`}>
      <Header />
      
      <main className="flex-1 container max-w-3xl py-10 px-4 sm:px-6">
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-mono text-center mb-2 text-blue-800 dark:text-blue-400">
            Générateur de contenu IA
          </h2>
          <p className="text-center text-snow-600 dark:text-snow-400 mb-8">
            Créez un post LinkedIn et un prompt d'image à partir d'une vidéo YouTube
          </p>
          
          <div className="snow-card p-6">
            <InputForm />
          </div>
        </section>

        <section>
          <ResultSection />
        </section>
        <div>
          <h1>AI you can use to Generate Images freely: <i><a href={"https://www.gentube.app/"}>Gentube</a></i>,<i><a href={"https://ghola.co/"}>Ghola Ai</a></i>,<i><a href={"https://www.animon.ai/explore"}>Animon Ai</a></i>,<i><a href={"https://perchance.org/ur-imagine-ai"}>Perchance AI</a></i></h1>
        </div>
      </main>

      <footer className="py-6 border-t border-snow-200 dark:border-snow-800">
        <div className="container text-center text-sm text-snow-500 dark:text-snow-500">
          <p>© 2025 SnowMeta - Propulsé par l'intelligence artificielle</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
