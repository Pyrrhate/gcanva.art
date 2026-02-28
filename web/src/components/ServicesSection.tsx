import { Code2, Layout, Search, Smartphone, Cpu, Shield } from "lucide-react";

// Interface pour un élément de service
export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  servicesItems: ServiceItem[];
}

// Map des icônes disponibles pour services
const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 className="w-6 h-6" />,
  layout: <Layout className="w-6 h-6" />,
  search: <Search className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
};

const ServicesSection = ({
  title = "Capabilities",
  subtitle = "What I do",
  servicesItems,
}: ServicesSectionProps) => {
  return (
    <section id="services" className="py-12 px-6 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
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
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesItems.map((service, index) => (
            <div
              key={service.title}
              className="glass rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden border border-primary/10 hover:border-primary/30"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-primary mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm group-hover:border-primary/40 transition-colors">
                  {service.icon && iconMap[service.icon]
                    ? iconMap[service.icon]
                    : <Code2 className="w-6 h-6" />}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="relative z-10 mt-2 h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-2xl" />
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <div
              className="w-1 h-1 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-1 h-1 rounded-full bg-primary animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
