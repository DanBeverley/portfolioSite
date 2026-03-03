import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  SiPython, SiPytorch, SiReact, SiAmazonwebservices, SiDocker,
  SiPostgresql, SiTypescript, SiNodedotjs, SiTensorflow, SiFastapi,
  SiGooglecloud, SiLangchain, SiSqlalchemy, SiCloudflare
} from "react-icons/si";
import { Database, Workflow, Hammer } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const techStack = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#232F3E' },
  { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Cloudflare', icon: SiCloudflare, color: '#F38020' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'SQLAlchemy', icon: SiSqlalchemy, color: '#D71F00' },
  { name: 'LangChain', icon: SiLangchain, color: '#1C3C3C' },
  { name: 'LangGraph', icon: Workflow, color: '#414141' },
  { name: 'LangSmith', icon: Hammer, color: '#414141' },
  { name: 'ChromaDB', icon: Database, color: '#FF6F00' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold">About Me</h1>
          </div>

          <div className="prose prose-lg prose-zinc max-w-none text-muted-foreground">
            <div className="space-y-6 text-lg leading-relaxed text-foreground font-light mb-8">
              <p>
                I am a passionate AI Engineer who always strives for improvements, likes to code, and drinks coffee ;)
              </p>
              <p>
                As a self-directed developer, my journey into Artificial Intelligence has been driven by curiosity and a relentless desire to build. Without traditional academic boundaries, I've had the freedom to dive deep into cutting-edge frameworks, stay ahead of rapid industry shifts, and focus entirely on practical, results-driven engineering.
              </p>
              <p>
                Beyond technical execution, I pride myself on strong English communication skills. I believe that writing clean code is only half the job; the other half is being able to clearly articulate complex AI concepts to teams, clients, and non-technical stakeholders to ensure we are solving the right problems.
              </p>
            </div>

            <div className="flex flex-col items-center mt-24 mb-16">
              <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-12">S K I L L S</h3>

              <TooltipProvider delayDuration={100}>
                <motion.div
                  className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 max-w-2xl mx-auto"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {techStack.map(skill => (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.5, y: 20 },
                        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 10 } }
                      }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="w-16 h-16 rounded-full border border-border bg-background flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-default shadow-sm hover:shadow-md relative group"
                          >
                            <div className="absolute inset-1 rounded-full border border-border/50 group-hover:border-primary/20 transition-colors pointer-events-none" />
                            <skill.icon
                              className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity"
                              style={{ color: skill.color }}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} className="bg-popover/95 backdrop-blur-sm">
                          <p className="font-medium text-sm">{skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </motion.div>
              </TooltipProvider>
            </div>


          </div>
        </motion.div>
      </main>
    </div>
  );
}
