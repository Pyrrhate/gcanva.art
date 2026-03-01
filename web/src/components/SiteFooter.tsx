export default async function SiteFooter() {
  return (
    <footer className="header-surface border-t border-border/65 px-6 py-8 md:py-10" role="contentinfo">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <p>Site propulsé par Next.js.</p>
          <p>
            Conception par{' '}
            <a
              href="https://studio.gcanva.art"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[2.25rem] text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded px-1 -mx-1"
            >
              studio.gcanva.art
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
