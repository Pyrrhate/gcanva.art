import { Github, Twitter, Linkedin, Mail, MapPin } from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterSectionProps {
  email?: string;
  footerText?: string;
  socialLinks?: SocialLink[];
}

const getIconForPlatform = (platform: string) => {
  const platformLower = platform.toLowerCase();
  if (platformLower.includes("github")) return <Github className="w-4 h-4" />;
  if (platformLower.includes("twitter")) return <Twitter className="w-4 h-4" />;
  if (platformLower.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
  if (platformLower.includes("mail") || platformLower.includes("email")) return <Mail className="w-4 h-4" />;
  return <MapPin className="w-4 h-4" />;
};

const FooterSection = ({
  email = "contact@example.com",
  footerText = "Built with Next.js 16 • Powered by Sanity • Deployed on Edge",
  socialLinks = [],
}: FooterSectionProps) => {
  return (
    <footer className="py-12 px-6 relative overflow-hidden">
      {/* Background gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-30" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] grid-pattern" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header - comme les autres sections */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              Let's Connect
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Prêt à Démarrer ?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto mb-8">
            Discutons de votre projet et forgeons ensemble votre prochain outil numérique.
          </p>

          {/* CTA Contact Button */}
          <a
            href={`mailto:${email}`}
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold overflow-hidden rounded-lg bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(87,131,187,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Mail className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Contact</span>
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {socialLinks && socialLinks.length > 0 ? (
            socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="group relative w-12 h-12 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 border border-primary/10 hover:border-primary/40 overflow-hidden"
                title={link.platform}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{getIconForPlatform(link.platform)}</span>
              </a>
            ))
          ) : (
            // Fallback default socials
            [
              { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
              { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
              { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
              { icon: <Mail className="w-5 h-5" />, href: `mailto:${email}`, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="group relative w-12 h-12 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 border border-primary/10 hover:border-primary/40 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{s.icon}</span>
              </a>
            ))
          )}
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Bottom copyright and tech signature */}
        <div className="text-center space-y-3">
          <div className="text-xs text-muted-foreground">
            © 2026 <span className="text-primary font-semibold">GCanva</span> • All rights reserved
          </div>
          <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
            {footerText}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
