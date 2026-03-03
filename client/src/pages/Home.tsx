import { useProjects } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Phone, MapPin, FileDown, Database, Workflow, Hammer, ArrowUp, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  SiPython, SiPytorch, SiReact, SiAmazonwebservices, SiDocker,
  SiPostgresql, SiTypescript, SiNodedotjs, SiTensorflow, SiFastapi,
  SiGooglecloud, SiLangchain, SiSqlalchemy, SiCloudflare
} from "react-icons/si";
import { PingPongGame } from "@/components/PingPongGame";

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

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isPongPlaying, setIsPongPlaying] = useState(false);
  const [isPongPaused, setIsPongPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  // Handle Hash Routing manually since we use a custom scroll container
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && containerRef.current) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast({ title: "Message sent!", description: "I'll get back to you as soon as possible." });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ variant: "destructive", title: "Failed to send", description: "Please try again later or email me directly." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "An error occurred while sending your message." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={`snap-y snap-proximity h-screen w-full overflow-y-scroll overflow-x-hidden bg-background scroll-smooth ${isPongPlaying ? 'select-none overflow-hidden' : ''}`}
    >
      <Navigation isHidden={isPongPlaying} />

      {/* Hero Section */}
      <section id="hero" className="snap-start min-h-screen flex items-center justify-center px-4 relative pt-20">
        <PingPongGame
          isPlaying={isPongPlaying}
          isPaused={isPongPaused}
          onClose={() => setIsPongPlaying(false)}
        />

        <AnimatePresence>
          {!isPongPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10"
            >
              <p className="text-[10px] md:text-xs font-mono tracking-[0.8em] sm:tracking-[1.2em] text-muted-foreground uppercase mb-6 sm:mb-8 ml-[0.8em] sm:ml-[1.2em]">
                A I &nbsp;E N G I N E E R
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-foreground tracking-tight mb-8 h-[70px] sm:h-[100px] md:h-[140px] flex items-center justify-center">
                <TypeAnimation
                  sequence={[
                    "Hi, my name's Dan (Hòa)",
                    2000,
                    "I_like_to_code_and_build.py",
                    2000,
                    "a coffee addict ☕...",
                    2000,
                    "and a certified gym rat ;)",
                    2000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline-block"
                />
              </h1>

              <motion.div
                className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mt-4 md:mt-8 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { label: "ABOUT", href: "#about" },
                  { label: "EXPERIENCE", href: "#experience" },
                  { label: "SKILLS", href: "#skills" },
                  { label: "PROJECTS", href: "#projects" }
                ].map((tab) => (
                  <a
                    key={tab.label}
                    href={tab.href}
                    className="px-6 py-2.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all"
                  >
                    {tab.label}
                  </a>
                ))}
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Section */}
      <section id="about" className="snap-start min-h-screen flex items-center justify-center px-4 relative pt-20">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-medium text-foreground tracking-tight mb-8 text-center">About Me</h2>
            <div className="prose prose-lg prose-zinc max-w-none text-muted-foreground text-center">
              <div className="space-y-6 text-lg leading-relaxed text-foreground font-light">
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
            </div>

            <div className="flex justify-center mt-12">
              <Button size="lg" className="rounded-full button-pop-reverse border border-border/60" variant="outline" onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Resume.pdf';
                link.click();
              }}>
                <FileDown className="w-4 h-4 mr-2" />
                Download Resume PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="snap-start min-h-screen flex items-center justify-center px-4 relative pt-20 bg-secondary/5">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#2B6B6D] mb-8 text-center md:text-left">Experience</h2>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l border-border">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[#2B6B6D] rounded-full" />
                    <h3 className="font-bold text-lg mb-1">TEDx Speaker on Artificial Intelligence</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-mono">TEDx Event • Application of AI in Energy Efficiency</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed mb-4">
                      <li>Delivered a comprehensive presentation on leveraging Artificial Intelligence to optimize energy efficiency networks.</li>
                      <li>Demonstrated strong public speaking and the rare ability to articulate complex, backend technical concepts to non-technical audiences.</li>
                      <li>Highlighted high-level English proficiency and confidence in professional communication.</li>
                    </ul>
                    <a href="https://youtu.be/SyzMD2hiJg4?si=mk6hLfIuTuwNgfDg" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="rounded-full shadow-sm bg-background border border-border/50 text-foreground hover:bg-muted transition-colors text-xs">
                        <Play className="w-3 h-3 mr-1.5 fill-current" />
                        Watch Presentation
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#2B6B6D] mb-8 text-center md:text-left">Education</h2>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l border-border">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 bg-[#2B6B6D] rounded-full" />
                    <h3 className="font-bold text-lg mb-1">Self-Directed AI & Software Engineering Curriculum</h3>
                    <p className="text-sm text-muted-foreground mb-4 font-mono">2-Year Intensive Auto-Didactic Journey</p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li>Completed rigorous, project-based coursework through Fast.ai, DeepLearning.AI, and Zero To Mastery (ZTM).</li>
                      <li>Cultivated a deep understanding of machine learning architectures by reading academic research papers and meticulously studying official documentation.</li>
                      <li>Built practical expertise through continuous iteration of personal engineering projects, transforming theoretical knowledge into deployable full-stack applications.</li>
                      <li>Maintained a strong emphasis on clear technical writing, ensuring all personal projects have professional-grade English documentation.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="snap-start min-h-screen flex flex-col items-center justify-center px-4 relative pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-3xl font-display font-medium text-foreground tracking-tight mb-16 text-center">Tech Stack</h2>

          <TooltipProvider delayDuration={100}>
            <motion.div
              className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6 justify-items-center"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
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
                    hidden: { opacity: 0, scale: 0, y: 30 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 12 } }
                  }}
                  whileHover={{ scale: 1.15, rotate: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-border bg-background flex items-center justify-center shadow-sm cursor-default relative group"
                      >
                        <div className="absolute inset-1 rounded-full border border-border/50 group-hover:border-primary/20 transition-colors pointer-events-none" />
                        <skill.icon
                          className="w-6 h-6 sm:w-8 sm:h-8 opacity-80 group-hover:opacity-100 transition-opacity"
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
        </motion.div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="snap-start min-h-screen flex flex-col justify-center px-4 relative pt-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto w-full">
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
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="snap-start min-h-screen flex items-center justify-center px-4 relative pt-20">
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-display font-medium text-foreground tracking-tight mb-8">
              I might have gotten what you need. <span className="text-muted-foreground">Lets talk.</span>
            </h2>

            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors hover:-translate-y-0.5 duration-300">
                <Phone className="w-5 h-5" />
                <span className="font-medium text-sm md:text-base tracking-wide">+84 359 084 252</span>
              </div>
              <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors hover:-translate-y-0.5 duration-300">
                <Mail className="w-5 h-5" />
                <span className="font-medium text-sm md:text-base tracking-wide">hoap43431@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-foreground hover:text-foreground/80 transition-colors hover:-translate-y-0.5 duration-300">
                <MapPin className="w-5 h-5" />
                <span className="font-medium text-sm md:text-base tracking-wide">Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </motion.div>

          <div className="max-w-[500px] mx-auto bg-background p-6 md:p-8 rounded-xl border border-border shadow-sm">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
                  placeholder="Name"
                />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
                  placeholder="Email"
                />
              </div>
              <input
                name="subject"
                type="text"
                required
                className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
                placeholder="Subject"
              />
              <textarea
                name="message"
                required
                rows={4}
                className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all resize-none placeholder:text-muted-foreground/60 text-sm"
                placeholder="Message"
              ></textarea>
              <Button
                type="submit"
                className="w-full h-10 bg-foreground hover:bg-foreground/90 text-background font-medium tracking-wide rounded-md shadow-sm transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5">
        {/* Pause Button (Disappears when scrolled past hero) */}
        <AnimatePresence>
          {!showScrollTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPongPaused(!isPongPaused)}
                className="rounded-full shadow-lg h-12 w-12 bg-background border border-border/50 text-foreground hover:bg-muted transition-colors"
                title={isPongPaused ? "Resume Background Pong" : "Pause Background Pong"}
              >
                {isPongPaused ? <Play className="w-5 h-5 ml-0.5" /> : <Pause className="w-5 h-5 fill-current" />}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Main Action Button (Play Pong -> Back to Top) */}
        <div className="relative h-12 w-[114px] flex justify-end">
          <AnimatePresence mode="wait">
            {!showScrollTop ? (
              <motion.div
                key="play-pong"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0"
              >
                <Button
                  variant="outline"
                  onClick={() => setIsPongPlaying(true)}
                  className="rounded-full shadow-lg h-12 px-6 bg-background border border-border/50 text-foreground hover:bg-muted font-mono tracking-widest text-[10px] sm:text-xs uppercase whitespace-nowrap transition-colors"
                >
                  Ping Pong
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="back-to-top"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-lg h-12 w-12 bg-background border border-border/50 text-foreground hover:bg-muted disabled:opacity-0 transition-opacity"
                  onClick={scrollToTop}
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
