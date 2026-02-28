"use client"

import Link from "next/link"
import { useCarnetTheme } from "../context/theme-context"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  const { theme } = useCarnetTheme()
  const isPapier = theme === "papier"

  return (
    <footer
      className={`relative px-4 sm:px-6 lg:px-8 py-16 ${
        isPapier
          ? "border-t-2 border-[#1a1a1a] bg-[#FDFCF0]"
          : "border-t border-[#00FF88]/30 bg-[#050505]"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div
              className={`text-xl tracking-wider mb-4 ${
                isPapier ? "text-[#1a1a1a]" : "text-[#00FF88]"
              }`}
              style={{ fontFamily: "var(--font-serif-carnet), Georgia, serif" }}
            >
              Carnet
            </div>
            <p
              className={`text-sm leading-relaxed ${
                isPapier ? "text-[#666]" : "text-[#00FF88]/60"
              }`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              L{"'"}espace organique où les idées poussent, mutent et se mélangent sans contrainte.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className={`text-xs uppercase tracking-widest mb-4 ${
                isPapier ? "text-[#888]" : "text-[#00FF88]/40"
              }`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              Navigation
            </h4>
            <nav className="space-y-2">
              {[
                { label: "Hub", href: "/" },
                { label: "Studio", href: "https://studio.gcanva.art" },
                { label: "Carnet", href: "/carnet" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm transition-colors ${
                    isPapier
                      ? "text-[#1a1a1a] hover:text-[#666]"
                      : "text-[#00FF88] hover:text-[#00FFFF]"
                  }`}
                  style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4
              className={`text-xs uppercase tracking-widest mb-4 ${
                isPapier ? "text-[#888]" : "text-[#00FF88]/40"
              }`}
              style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
            >
              Connexions
            </h4>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={`p-2 transition-all ${
                    isPapier
                      ? "border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FDFCF0]"
                      : "border border-[#00FF88]/50 text-[#00FF88] hover:border-[#00FF88] hover:bg-[#00FF88] hover:text-[#050505]"
                  }`}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isPapier ? "border-t border-[#1a1a1a]/20" : "border-t border-[#00FF88]/20"
          }`}
        >
          <span
            className={`text-xs ${isPapier ? "text-[#888]" : "text-[#00FF88]/40"}`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            © 2026 Underground Alchemist. Tous droits réservés.
          </span>
          
          <span
            className={`text-xs ${isPapier ? "text-[#888]" : "text-[#00FF88]/40"}`}
            style={{ fontFamily: "var(--font-mono-carnet), monospace" }}
          >
            gcanva.art
          </span>
        </div>
      </div>
    </footer>
  )
}
