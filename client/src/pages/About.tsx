import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-12">About Me</h1>
          
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

            <h3 className="text-foreground mt-12 mb-4 font-bold">Skills</h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 list-none pl-0">
              {['Python', 'TensorFlow', 'PyTorch', 'React', 'TypeScript', 'Node.js', 'Docker', 'AWS', 'PostgreSQL'].map(skill => (
                <li key={skill} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {skill}
                </li>
              ))}
            </ul>

            <h3 className="text-foreground mt-12 mb-4 font-bold">Experience</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-foreground font-semibold">Senior AI Engineer</h4>
                  <span className="text-sm font-mono">2021 - Present</span>
                </div>
                <p className="text-sm">TechCorp Inc.</p>
                <p className="text-base mt-2">Leading the ML infrastructure team and developing generative AI solutions.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-foreground font-semibold">Machine Learning Engineer</h4>
                  <span className="text-sm font-mono">2019 - 2021</span>
                </div>
                <p className="text-sm">DataStartups Ltd.</p>
                <p className="text-base mt-2">Built recommendation engines and predictive analytics dashboards.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
