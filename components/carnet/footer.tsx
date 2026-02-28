import { ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-12 md:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left */}
        <div className="flex flex-col gap-2">
          <span className="font-serif text-lg italic">Carnet</span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            Underground Alchemist / gcanva.art
          </span>
        </div>

        {/* Center - Nav */}
        <div className="flex items-center gap-6">
          <a
            href="https://studio.gcanva.art"
            className="flex items-center gap-1 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Studio
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a
            href="https://gcanva.art"
            className="flex items-center gap-1 font-mono text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Hub
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Right */}
        <span className="font-mono text-[10px] text-muted-foreground">
          {"// "} Transmutation en cours...
        </span>
      </div>
    </footer>
  )
}
