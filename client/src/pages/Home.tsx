import { useProjects } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Loader2, Mail, Linkedin, Github } from "lucide-react";
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
            <Button size="lg" className="rounded-full px-8 h-12 text-base button-pop-reverse" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
              View Selected Work
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base button-pop-reverse" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
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

      {/* Contact Section */}
      <section className="px-4 py-32 bg-secondary/20" id="contact">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-display font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground">
              Have a question or want to work together? Drop me a message below.
            </p>
          </motion.div>

          <div className="bg-background p-8 md:p-12 rounded-2xl border border-border shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-md border border-border bg-muted/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-md border border-border bg-muted/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-border bg-muted/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <Button size="lg" className="w-full button-pop-reverse">
                Send Message
              </Button>
            </form>

            <div className="mt-12 pt-12 border-t border-border flex flex-wrap justify-center gap-8">
              {[
                { name: 'Email', href: 'mailto:hello@portfolio.ai', icon: Mail },
                { name: 'LinkedIn', href: '#', icon: Linkedin },
                { name: 'GitHub', href: '#', icon: Github }
              ].map(social => (
                <a key={social.name} href={social.href} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                  <social.icon className="w-4 h-4" />
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
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
