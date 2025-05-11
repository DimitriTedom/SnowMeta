
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { generateContent, setVideoUrl, setColor } from "@/store/slices/generatorSlice";
import { LoadingSpinner } from "./LoadingSpinner";
import { toast } from "sonner";

export function InputForm() {
  const dispatch = useAppDispatch();
  const { videoUrl, color, status } = useAppSelector((state) => state.generator);
  const [urlError, setUrlError] = useState<string>("");

  const isLoading = status === 'loading';

  const validateYoutubeUrl = (url: string): boolean => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return pattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl.trim()) {
      toast.error("Veuillez entrer une URL YouTube");
      setUrlError("Veuillez entrer une URL YouTube");
      return;
    }

    if (!validateYoutubeUrl(videoUrl)) {
      toast.error("URL YouTube invalide");
      setUrlError("Format d'URL YouTube invalide");
      return;
    }

    setUrlError("");
    dispatch(generateContent({ videoUrl, color }));
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVideoUrl(e.target.value));
    if (urlError) setUrlError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="videoUrl" 
            className="block text-sm font-medium font-mono mb-1 text-snow-700 dark:text-snow-300"
          >
            URL YouTube
          </label>
          <Input
            id="videoUrl"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={handleVideoUrlChange}
            className={`font-mono bg-white dark:bg-snow-800 border ${
              urlError ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            disabled={isLoading}
          />
          {urlError && (
            <p className="mt-1 text-xs text-red-500">{urlError}</p>
          )}
        </div>

        <div>
          <label 
            htmlFor="colorPicker" 
            className="block text-sm font-medium font-mono mb-1 text-snow-700 dark:text-snow-300"
          >
            Couleur principale
          </label>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg border border-snow-200 dark:border-snow-700"
              style={{ backgroundColor: color }}
            ></div>
            <Input
              id="colorPicker"
              type="color"
              value={color}
              onChange={(e) => dispatch(setColor(e.target.value))}
              className="w-12 h-12 p-1 cursor-pointer"
              disabled={isLoading}
            />
            <Input
              type="text"
              value={color}
              onChange={(e) => dispatch(setColor(e.target.value))}
              className="font-mono uppercase bg-white dark:bg-snow-800"
              disabled={isLoading}
              maxLength={7}
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !videoUrl.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-mono py-6"
      >
        {isLoading ? <LoadingSpinner size="sm" /> : "Générer le contenu"}
      </Button>
    </form>
  );
}
