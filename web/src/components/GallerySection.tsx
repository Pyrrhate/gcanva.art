import { ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/client";

// Interface pour un projet
export interface GalleryProject {
  title: string;
  category: string;
  image: any; // Image Sanity
  url?: string;
  span?: string; // Classes de grid span
}

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  projects: GalleryProject[];
}

const GallerySection = ({ 
  title = "The Gallery",
  subtitle = "The Output",
  description = "Selected works from the factory floor. Each piece is engineered to perform.",
  projects
}: GallerySectionProps) => {
  return (
    <section id="gallery" className="py-12 px-6 relative">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header avec style industriel */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent-foreground">
              {subtitle}
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            {description}
          </p>
        </div>

        {/* Gallery Grid avec effets industriels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`${project.span || 'md:col-span-1'} group relative overflow-hidden rounded-2xl glass aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.02] border border-primary/10 hover:border-primary/30`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image avec effet de zoom */}
              {project.image && (
                <img
                  src={urlFor(project.image).width(800).url()}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              )}

              {/* Overlay gradient industriel */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

              {/* Content avec animation */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-xs font-medium text-primary tracking-wider uppercase mb-2 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  {project.category}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                    </a>
                  )}
                </div>
                
                {/* Bottom accent line */}
                <div className="mt-3 h-px w-full bg-gradient-to-r from-primary via-accent to-transparent" />
              </div>

              {/* Static label badge */}
              <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 border border-primary/20 backdrop-blur-md">
                <span className="text-xs font-medium text-foreground/80 uppercase tracking-wider">
                  {project.category}
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-3xl" />
              
              {/* Bottom corner accent */}
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-3xl" />
            </div>
          ))}
        </div>

        {/* Industrial decorative element */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
