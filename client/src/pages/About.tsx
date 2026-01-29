import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
            <Button className="button-pop-reverse">
              Download Resume
            </Button>
          </div>
          
          <div className="prose prose-lg prose-zinc max-w-none text-muted-foreground">
            <p className="text-xl leading-relaxed mb-8 text-foreground font-light">
              I am a passionate AI Engineer with a background in Computer Science and Data Science.
              My work focuses on bridging the gap between complex machine learning models and 
              intuitive human-centered applications.
            </p>
            
            <p className="mb-6">
              With over 5 years of experience in the tech industry, I've worked on projects ranging from
              computer vision systems for autonomous vehicles to natural language processing interfaces
              for customer support automation.
            </p>

            <h3 className="text-foreground mt-12 mb-8 font-bold">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              {[
                { name: 'Python', icon: 'SiPython' },
                { name: 'PyTorch', icon: 'SiPytorch' },
                { name: 'React', icon: 'SiReact' },
                { name: 'AWS', icon: 'SiAmazonwebservices' },
                { name: 'Docker', icon: 'SiDocker' },
                { name: 'PostgreSQL', icon: 'SiPostgresql' },
                { name: 'TypeScript', icon: 'SiTypescript' },
                { name: 'Node.js', icon: 'SiNodedotjs' },
                { name: 'TensorFlow', icon: 'SiTensorflow' },
                { name: 'FastAPI', icon: 'SiFastapi' }
              ].map(skill => (
                <div key={skill.name} className="flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-110">
                  <div className="w-12 h-12 flex items-center justify-center bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors">
                    <span className="text-xs font-bold text-primary">{skill.name[0]}</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{skill.name}</span>
                </div>
              ))}
            </div>

            <h3 className="text-foreground mt-24 mb-12 font-bold">Experience</h3>
            <div className="relative border-l border-border ml-3 space-y-12">
              {[
                {
                  role: "Senior AI Engineer",
                  company: "TechCorp Inc.",
                  period: "2021 - Present",
                  description: "Leading the ML infrastructure team and developing generative AI solutions."
                },
                {
                  role: "Machine Learning Engineer",
                  company: "DataStartups Ltd.",
                  period: "2019 - 2021",
                  description: "Built recommendation engines and predictive analytics dashboards."
                }
              ].map((exp, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_0_4px_white]" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
                    <span className="text-sm font-mono text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-sm font-medium text-primary mb-2">{exp.company}</p>
                  <p className="text-base text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
