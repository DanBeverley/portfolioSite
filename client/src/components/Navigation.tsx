import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const links = [
    { href: "/", label: "Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity">
            PORTFOLIO<span className="text-primary/40">.AI</span>
          </Link>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="relative group">
                <span className={`text-sm font-medium tracking-wide transition-colors ${
                  location === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}>
                  {link.label}
                </span>
                {location === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-border">
                <Link href="/admin">
                  <Button variant="ghost" size="sm" className="font-bold border border-primary/20 hover:bg-primary hover:text-background transition-all duration-300 button-pop-reverse">
                    Upload Work
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => logout()}
                  title="Logout"
                  className="rounded-full w-8 h-8 hover:bg-destructive hover:text-destructive-foreground transition-all button-pop-reverse"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <a href="/api/login" className="flex items-center gap-2 text-sm font-bold text-primary px-6 py-2 border-2 border-primary rounded-full hover:bg-primary hover:text-background transition-all duration-300 button-pop-reverse">
                <span>Admin Login</span>
                <User className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
