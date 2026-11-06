import { Mail, Linkedin, Twitter, Github, Instagram } from "lucide-react";

export function Navigation({ isHidden }: { isHidden?: boolean }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md transition-opacity duration-500 ease-in-out ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 md:gap-3 text-muted-foreground/60">
              <a href="https://www.linkedin.com/in/dan-beverley-b680262b8" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="grid size-11 place-items-center hover:text-foreground transition-colors"><Linkedin className="w-[18px] h-[18px]" /></a>
              <a href="https://github.com/DanBeverley" aria-label="GitHub" target="_blank" rel="noreferrer" className="grid size-11 place-items-center hover:text-foreground transition-colors"><Github className="w-[18px] h-[18px]" /></a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="/#contact" className="flex min-h-11 items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors sm:ml-4">
              <Mail className="w-[18px] h-[18px]" />
              GET IN TOUCH
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
