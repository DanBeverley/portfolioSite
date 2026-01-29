import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { FileDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resume() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <Navigation />
      
      <main className="pt-32 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-border pb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Resume</h1>
              <p className="text-muted-foreground">AI Engineer specializing in Machine Learning & Full-stack Systems</p>
            </div>
            <Button size="lg" className="button-pop-reverse rounded-full">
              <FileDown className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-primary mb-6">Experience</h2>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l border-border">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 bg-primary rounded-full" />
                    <h3 className="font-bold">Senior AI Engineer</h3>
                    <p className="text-sm text-muted-foreground mb-4">TechCorp Inc. • 2021 — Present</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Led development of a custom RAG pipeline improving information retrieval by 40%</li>
                      <li>Architected ML infrastructure on AWS supporting 50k+ daily inferences</li>
                      <li>Mentored team of 5 junior engineers in PyTorch best practices</li>
                    </ul>
                  </div>
                  <div className="relative pl-6 border-l border-border">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 bg-primary rounded-full" />
                    <h3 className="font-bold">Machine Learning Engineer</h3>
                    <p className="text-sm text-muted-foreground mb-4">DataStartups Ltd. • 2019 — 2021</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Built and deployed recommendation engine using collaborative filtering</li>
                      <li>Optimized computer vision models for edge devices reducing latency by 30%</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-primary mb-6">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">M.S. in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">Stanford University • 2017 — 2019</p>
                  </div>
                  <div>
                    <h3 className="font-bold">B.S. in Mathematics</h3>
                    <p className="text-sm text-muted-foreground">MIT • 2013 — 2017</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-primary mb-6">Contact</h2>
                <div className="space-y-4">
                  <a href="mailto:hello@portfolio.ai" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    hello@portfolio.ai
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-4 h-4" />
                    linkedin.com/in/ai-engineer
                  </a>
                  <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                    github.com/ai-engineer
                  </a>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-mono uppercase tracking-widest text-primary mb-6">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {['PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'LLMs', 'React', 'TypeScript', 'Docker', 'AWS'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
