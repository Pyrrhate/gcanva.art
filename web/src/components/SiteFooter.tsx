export default async function SiteFooter() {
  return (
    <footer className="header-surface border-t border-border/65 px-6 py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground">
        <p>Site propulsé par Next.js.</p>
        <p>
          Conception par{' '}
          <a
            href="https://studio.gcanva.art"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-primary"
          >
            studio.gcanva.art
          </a>
        </p>
      </div>
    </footer>
  )
}
