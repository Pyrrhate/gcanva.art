"use client"

import Link from "next/link"
import { Github, Twitter, Mail, ExternalLink } from "lucide-react"
import { useCarnetTheme } from "@/contexts/carnet-theme-context"
import { cn } from "@/lib/utils"

export function CarnetFooter() {
  const { theme } = useCarnetTheme()

  return (
    <footer className={cn(
      "px-6 md:px-12 py-12 border-t-2 border-border theme-transition",
      theme === "papier" && "border-dashed bg-card paper-texture",
      theme === "vectrex" && "bg-card"
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className={cn(
              "font-serif text-2xl",
              theme === "vectrex" && "font-mono text-xl neon-glow"
            )}>
              Underground Alchemist
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-sm">
              Un espace où le code devient art, où les algorithmes deviennent des pinceaux, 
              et où chaque création est une expérimentation.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className={cn(
              "font-mono text-xs tracking-widest uppercase",
              theme === "vectrex" && "text-accent"
            )}>
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/"
                className={cn(
                  "font-mono text-sm text-muted-foreground hover:text-foreground transition-colors",
                  "flex items-center gap-2",
                  theme === "vectrex" && "hover:text-accent"
                )}
              >
                <span className="w-1 h-1 bg-current" />
                Hub
              </Link>
              <Link 
                href="https://studio.gcanva.art"
                className={cn(
                  "font-mono text-sm text-muted-foreground hover:text-foreground transition-colors",
                  "flex items-center gap-2",
                  theme === "vectrex" && "hover:text-accent"
                )}
              >
                <span className="w-1 h-1 bg-current" />
                Studio
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link 
                href="/carnet"
                className={cn(
                  "font-mono text-sm text-muted-foreground hover:text-foreground transition-colors",
                  "flex items-center gap-2",
                  theme === "vectrex" && "hover:text-accent"
                )}
              >
                <span className="w-1 h-1 bg-current" />
                Carnet
              </Link>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className={cn(
              "font-mono text-xs tracking-widest uppercase",
              theme === "vectrex" && "text-accent"
            )}>
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border border-border transition-all",
                  theme === "papier" && "hover:bg-secondary hover:rotate-3",
                  theme === "vectrex" && "hover:neon-border"
                )}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border border-border transition-all",
                  theme === "papier" && "hover:bg-secondary hover:-rotate-3",
                  theme === "vectrex" && "hover:neon-border"
                )}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="mailto:hello@gcanva.art"
                className={cn(
                  "p-2 border border-border transition-all",
                  theme === "papier" && "hover:bg-secondary hover:rotate-2",
                  theme === "vectrex" && "hover:neon-border"
                )}
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={cn(
          "pt-8 border-t border-border/50",
          "flex flex-col sm:flex-row items-center justify-between gap-4"
        )}>
          <div className="font-mono text-[10px] text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} GCanva. Tous droits réservés.
          </div>
          <div className={cn(
            "font-mono text-[10px] tracking-[0.3em] uppercase",
            theme === "vectrex" && "text-accent"
          )}>
            Carnet : Alchimie Digitale
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className={cn(
        "mt-12 text-center font-mono text-[10px] text-muted-foreground/30 tracking-widest",
        theme === "vectrex" && "neon-glow opacity-20"
      )}>
        ▲ ▼ ◀ ▶
      </div>
    </footer>
  )
}
