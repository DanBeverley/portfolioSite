import { useRoute } from "wouter";
import { useProject } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: project, isLoading } = useProject(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <Navigation />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-32 px-4 max-w-5xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-3 mb-12">
          {project.tags?.map((tag, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-xl mb-12 bg-muted shadow-xl">
          {/* Detailed project view image */}
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">About the Project</h2>
            <div className="prose prose-zinc max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.description}
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
              <h3 className="font-bold mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.projectUrl && (
                  <a 
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <span className="font-medium">Live Demo</span>
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-3 rounded-lg border border-input hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">Source Code</span>
                    <Github className="w-4 h-4" />
                  </a>
                )}

                {!project.projectUrl && !project.repoUrl && (
                  <p className="text-sm text-muted-foreground italic">No public links available.</p>
                )}
              </div>
            </div>

            <div className="p-6 bg-secondary/20 border border-border rounded-xl">
              <h3 className="font-bold mb-2">Tech Stack</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {project.tags?.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
