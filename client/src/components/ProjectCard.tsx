import { Project } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative block h-full"
    >
      <Link href={`/project/${project.id}`} className="block h-full cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4 rounded-sm project-card-hover">
          {/* Descriptive comment for dynamic image */}
          {/* Dynamic project image from user URL */}
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          <div className="absolute top-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-black" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-display font-bold leading-tight group-hover:underline decoration-1 underline-offset-4">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-muted-foreground pt-1">0{index + 1}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-secondary text-secondary-foreground rounded-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
