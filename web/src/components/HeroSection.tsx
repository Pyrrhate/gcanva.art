import { ArrowRight, Zap, CircuitBoard } from "lucide-react";
import { urlFor } from "@/sanity/client";

// Interface définissant les props du composant
interface HeroProps {
  title: string;
  subtitle: string;
  mainImage: any;
}

const HeroSection = ({ title, subtitle, mainImage }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient">
      {/* Animated mesh gradient - handled by ::before pseudo-element */}
      
      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animation: 'glow-float 8s ease-in-out infinite' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animation: 'glow-float 10s ease-in-out infinite 2s' }} />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animation: 'glow-float 12s ease-in-out infinite 4s' }} />

      {/* Industrial grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.01] grid-pattern"
        style={{
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated scanlines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Profile Image with Industrial Border */}
        {mainImage && (
          <div className="animate-fade-up mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-75 group-hover:opacity-100 blur animate-glow transition duration-1000" />
              <img 
                src={urlFor(mainImage).width(200).url()} 
                alt="Profile" 
                className="relative rounded-full w-32 h-32 object-cover border-2 border-primary/50 ring-2 ring-background"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <CircuitBoard className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Badge with glow effect */}
        <div className="animate-fade-up-delay-1 inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 border border-primary/20">
          <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-xs font-medium tracking-wider text-foreground/80 uppercase">
            Powered by Next.js 16 • Edge Runtime
          </span>
        </div>

        {/* Heading with gradient and glow */}
        <h1 className="animate-fade-up-delay-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="block text-foreground">{title}</span>
          {/* Subheading - simple and clean */}
          <span className="block text-accent mt-4 text-xl sm:text-2xl md:text-3xl">{subtitle}</span>
        </h1>

        {/* Decorative line */}
        <div className="animate-fade-up-delay-3 flex items-center justify-center gap-3 my-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* CTA Buttons with industrial style */}
        <div className="animate-fade-up-delay-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#stack"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold overflow-hidden rounded-lg bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(87,131,187,0.5)]"
          >
            <span className="relative z-10">Explore the Forge</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </a>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-lg glass glass-hover border border-primary/30 text-foreground transition-all duration-300 hover:border-primary/60"
          >
            View Portfolio
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
          </a>
        </div>

        {/* Tech stats - pour un effet industriel */}
        <div className="animate-fade-up-delay-3 mt-16 flex items-center justify-center gap-8 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="uppercase tracking-wider">Edge Optimized</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="uppercase tracking-wider">Real-time CMS</span>
          </div>
          <div className="w-px h-3 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="uppercase tracking-wider">Type-safe</span>
          </div>
        </div>
      </div>

      {/* Bottom fade with subtle glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent" />
    </section>
  );
};

export default HeroSection;