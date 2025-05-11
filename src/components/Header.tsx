
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-snow-200 dark:border-snow-700 bg-snow-50/80 dark:bg-snow-900/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="font-mono font-bold text-xl text-blue-800 dark:text-blue-400">
            Snow<span className="text-cyan-600">Meta</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
