import {getSiteSettingsSeo} from '@/sanity/seo'

const CONTACT_EMAIL = 'guillaume.canva@gmail.com'

export default async function SiteFooter() {
  const settings = await getSiteSettingsSeo()

  const socialLinks = (settings?.socialLinks || [])
    .filter((item) => item?.label && item?.url)
    .map((item) => ({
      label: item.label as string,
      url: item.url as string,
    }))

  return (
    <footer className="header-surface border-t border-border/65 px-6 py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="w-fit font-medium text-foreground hover:text-primary"
        >
          Contact: {CONTACT_EMAIL}
        </a>

        {socialLinks.length > 0 && (
          <nav aria-label="Réseaux sociaux" className="flex flex-wrap items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={`${item.label}-${item.url}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
}
