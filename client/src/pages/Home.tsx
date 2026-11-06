import { useProjects } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Phone, MapPin, FileDown, ArrowUp, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

import {
  SiAmazonwebservices, SiDart, SiDocker, SiFastapi, SiFlutter, SiGit,
  SiGithubactions, SiOpenjdk, SiPostgresql, SiPython, SiReact, SiSqlite, SiTypescript
} from "react-icons/si";
import { PingPongGame } from "@/components/PingPongGame";

declare const __CONTACT_ENDPOINT__: string | null;

const techStack = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Java', icon: SiOpenjdk, color: '#B66D26' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Dart', icon: SiDart, color: '#0175C2' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'React', icon: SiReact, color: '#1885A0' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'SQLite', icon: SiSqlite, color: '#0F80CC' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#232F3E' },
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
    if (!__CONTACT_ENDPOINT__) return;
    const form = e.currentTarget;
    setIsSubmitting(true);

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(__CONTACT_ENDPOINT__, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast({ title: "Message sent!", description: "I'll get back to you as soon as possible." });
        form.reset();
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
      className={`h-dvh w-full overflow-x-hidden bg-background scroll-pt-16 scroll-smooth md:scroll-pt-0 md:snap-y md:snap-proximity ${isPongPlaying ? 'select-none overflow-y-hidden' : 'overflow-y-auto'}`}
    >
      <Navigation isHidden={isPongPlaying} />

      {/* Hero Section */}
      <section id="hero" className="snap-start min-h-svh flex items-center justify-center px-4 relative pt-16 pb-20 md:pt-20 md:pb-0">
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
              <p className="text-[10px] md:text-xs font-mono tracking-widest text-muted-foreground uppercase mb-6 sm:mb-8">
                Software Engineering
              </p>
              <h1 className="w-full min-h-[105px] md:h-[140px] flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-medium text-foreground tracking-tight mb-4 md:mb-8">
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
                  className="inline-block min-w-0 break-words"
                />
              </h1>

              <motion.div
                className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mt-4 md:mt-8 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  { label: "PROJECTS", href: "#projects" },
                  { label: "SKILLS", href: "#skills" },
                  { label: "ABOUT", href: "#about" },
                  { label: "BACKGROUND", href: "#experience" }
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

              <Button asChild size="lg" className="rounded-full border border-border/60" variant="outline">
                <a href="/resume.pdf" download="Phan_Ngoc_Hoa_Software_Engineer_CV.pdf">
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Section */}
      <section id="about" className="snap-start flex items-center justify-center px-4 py-14 md:min-h-screen md:pt-20 md:pb-0">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-medium text-foreground tracking-tight mb-8 text-center">About Me</h2>
            <div className="prose prose-lg prose-zinc max-w-none text-muted-foreground text-center">
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground font-light">
                <p>
                  I’m Hòa, an Information Technology student at Nong Lam University seeking a software engineering internship or junior developer role.
                </p>
                <p>
                  I build backend services with Python and FastAPI, and client applications with Flutter and React. I love building, engineering things and somewhat of a problem solver myself ;). Always hungry for knowledge and willing to learn, to adapt
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Background */}
      <section id="experience" className="snap-start md:scroll-mt-20 px-4 py-14 sm:py-20 bg-secondary/5">
        <div className="max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#2B6B6D] mb-4">Education</h2>
                <h3 className="font-bold text-lg mb-1">Nong Lam University</h3>
                <p className="text-sm text-muted-foreground">Undergraduate studies in Information Technology</p>
                <p className="text-sm text-muted-foreground mt-1">2022 to present · Ho Chi Minh City, Vietnam</p>
              </div>

              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-[#2B6B6D] mb-4">Public Speaking</h2>
                <h3 className="font-bold text-lg mb-1">Ensuring Energy-Efficient Networks With AI</h3>
                <p className="text-sm text-muted-foreground mb-4">Speaker at TEDxYouth@IGCSchoolTBD</p>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <a href="https://www.youtube.com/watch?v=SyzMD2hiJg4" target="_blank" rel="noopener noreferrer">
                    <Play className="w-3 h-3" aria-hidden="true" />
                    Watch the talk
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="snap-start flex flex-col items-center justify-center px-4 py-14 md:min-h-screen md:pt-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <h2 className="text-3xl font-display font-medium text-foreground tracking-tight mb-8 md:mb-16 text-center">Tech Stack</h2>

          <motion.div
            className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-x-4 gap-y-6"
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
                className="flex flex-col items-center gap-2 text-center"
                variants={{
                  hidden: { opacity: 0, scale: 0, y: 30 },
                  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 12 } }
                }}
                whileHover={{ scale: 1.15, rotate: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-border bg-background flex items-center justify-center shadow-sm">
                  <skill.icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: skill.color }} aria-hidden="true" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" className="snap-start flex flex-col justify-center px-4 py-14 md:min-h-screen md:pt-20 md:pb-0 bg-secondary/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-6 md:mb-12 border-b border-border pb-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Selected Projects</h2>
            <span className="text-sm font-mono text-muted-foreground">{projects?.length || 0} ITEMS</span>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-3">
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
      <section id="contact" className="snap-start flex items-center justify-center px-4 pt-14 pb-24 md:min-h-screen md:pt-20">
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
            <form className="space-y-4 [&_input]:text-base [&_textarea]:text-base md:[&_input]:text-sm md:[&_textarea]:text-sm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
                  placeholder="Name"
                />
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
                  placeholder="Email"
                />
              </div>
              <input
                name="subject"
                type="text"
                required
                maxLength={160}
                className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all placeholder:text-muted-foreground/60 text-sm"
                placeholder="Subject"
              />
              <textarea
                name="message"
                required
                maxLength={4000}
                rows={4}
                className="w-full px-3 py-2.5 rounded-md border-0 bg-[#E9ECEF]/80 focus:bg-[#E9ECEF] focus:ring-2 focus:ring-[#6EB298]/50 outline-none transition-all resize-none placeholder:text-muted-foreground/60 text-sm"
                placeholder="Message"
              ></textarea>
              <Button
                type="submit"
                className="w-full h-10 bg-foreground hover:bg-foreground/90 text-background font-medium tracking-wide rounded-md shadow-sm transition-colors"
                disabled={isSubmitting || !__CONTACT_ENDPOINT__}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit"}
              </Button>
              {!__CONTACT_ENDPOINT__ && (
                <p className="text-sm text-muted-foreground">
                  The contact form is temporarily unavailable. You can email me directly using the address above.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2">
        {/* Pause Button (Disappears when scrolled past hero) */}
        <AnimatePresence>
          {!showScrollTop && !isPongPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
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
        {!isPongPlaying && (
          <AnimatePresence mode="wait">
            {!showScrollTop ? (
              <motion.div
                key="play-pong"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
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
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full shadow-lg h-12 w-12 bg-background border border-border/50 text-foreground hover:bg-muted disabled:opacity-0 transition-opacity"
                  onClick={scrollToTop}
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
