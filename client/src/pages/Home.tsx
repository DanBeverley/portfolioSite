import { useProjects } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-foreground mb-8">
            Building the <br />
            <span className="text-muted-foreground">intelligent future.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            I'm an AI Engineer specializing in machine learning, 
            neural networks, and crafting intuitive interfaces for complex systems.
          </p>
          
          <motion.div 
            className="mt-12 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base button-pop-reverse" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
              View Selected Work
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base button-pop-reverse">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-32 max-w-7xl mx-auto" id="work">
        <div className="flex justify-between items-end mb-12 border-b border-border pb-4">
          <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Selected Projects</h2>
          <span className="text-sm font-mono text-muted-foreground">{projects?.length || 0} ITEMS</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {projects?.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed border-border rounded-lg">
                No projects published yet.
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-display font-bold text-2xl">PORTFOLIO.AI</p>
          <div className="text-sm text-neutral-400">
            © {new Date().getFullYear()} AI Engineer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
