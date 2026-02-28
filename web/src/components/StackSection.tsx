import { Code2, Palette, GitBranch, Globe, FileText, Wrench, Cpu, Database, Server, Zap } from "lucide-react";

// Interface pour un élément de la stack
export interface StackItem {
  title: string;
  description: string;
  icon?: string; // Nom de l'icône (optionnel)
  span?: string; // Classes de grid span
  accentClass?: string;
}

interface StackSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stackItems: StackItem[];
}

// Map des icônes disponibles
const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-6 h-6" />,
  palette: <Palette className="w-5 h-5" />,
  git: <GitBranch className="w-5 h-5" />,
  globe: <Globe className="w-5 h-5" />,
  file: <FileText className="w-5 h-5" />,
  wrench: <Wrench className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  server: <Server className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
};

const StackSection = ({ 
  title = "The Stack",
  subtitle = "The Engine Room",
  description = "Every module is purpose-built for speed, scale, and creative freedom.",
  stackItems 
}: StackSectionProps) => {
  return (
    <section id="stack" className="py-12 px-6 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header avec style industriel */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              {subtitle}
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            {description}
          </p>
        </div>

        {/* Bento Grid avec effet glow - Grille 3 colonnes centrée */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {stackItems.map((item, index) => (
            <div
              key={item.title}
              className={`${item.span || 'col-span-1'} glass rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden border border-primary/10 hover:border-primary/30`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className={`${item.accentClass || 'text-primary'} mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm group-hover:border-primary/40 transition-colors`}>
                  {item.icon && iconMap[item.icon] ? iconMap[item.icon] : <Wrench className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Bottom glow line */}
              <div className="relative z-10 mt-4 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-3xl" />
            </div>
          ))}
        </div>

        {/* Industrial decorative element */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default StackSection;
