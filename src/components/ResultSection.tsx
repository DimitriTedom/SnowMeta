
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CopyButton } from "./CopyButton";
import { useAppSelector } from "@/hooks/redux";
import { LoadingSpinner } from "./LoadingSpinner";

export function ResultSection() {
  const { linkedinPost, imagePrompt, status } = useAppSelector((state) => state.generator);
  
  const isLoading = status === 'loading';
  const hasResults = linkedinPost || imagePrompt;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-snow-600 dark:text-snow-400 font-mono">
            Génération du contenu en cours...
          </p>
        </div>
      ) : !hasResults ? (
        <div className="text-center py-12">
          <p className="text-snow-600 dark:text-snow-400 font-mono">
            Entrez une URL YouTube et choisissez une couleur pour générer du contenu
          </p>
        </div>
      ) : (
        <>
          <Card className="snow-card overflow-hidden gradient-border">
            <CardHeader className="bg-snow-100/50 dark:bg-snow-800/50">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-lg text-blue-800 dark:text-blue-400">
                  Post LinkedIn
                </CardTitle>
                {linkedinPost && <CopyButton text={linkedinPost} />}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[200px] p-4">
                <div className="whitespace-pre-wrap font-sans text-snow-800 dark:text-snow-200">
                  {linkedinPost}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="snow-card overflow-hidden gradient-border">
            <CardHeader className="bg-snow-100/50 dark:bg-snow-800/50">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-lg text-blue-800 dark:text-blue-400">
                  Prompt d'image
                </CardTitle>
                {imagePrompt && <CopyButton text={imagePrompt} />}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="font-mono text-sm p-3 bg-snow-100 dark:bg-snow-900 rounded-md overflow-x-auto">
                {imagePrompt}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
