import { ArrowUpRight } from "lucide-react"
import { site } from "./site"

const practices = [
  {
    title: "Intégration",
    text: "Les maquettes Figma ou Canva deviennent des interfaces. Le pixel est respecté, l’expérience de la personne qui visite l’est encore plus.",
  },
  {
    title: "Performance",
    text: "Un site est un outil de travail. Il doit être rapide sur mobile, accessible, et lisible par les moteurs de recherche.",
  },
  {
    title: "Maintenance",
    text: "Le web bouge, le site aussi. Je l’accompagne dans la durée, sans laisser s’accumuler de dette technique.",
  },
] as const

export default function PortalPage() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Aller au contenu
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 px-6 py-5 backdrop-blur-md md:px-12 md:py-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <a href="#contenu" className="text-sm font-medium tracking-wider uppercase text-foreground/90">
            GCanva
          </a>
          <nav aria-label="Navigation" className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href={site.studioUrl} className="transition-colors hover:text-foreground">
              Studio
            </a>
            <a href={site.carnetUrl} className="transition-colors hover:text-foreground">
              Carnet
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main id="contenu" className="bg-background text-foreground">
        <div className="lg:grid lg:min-h-[100svh] lg:grid-cols-2">
          <section className="flex flex-col justify-center px-6 pb-16 pt-28 md:px-12 md:pt-32 lg:px-16 lg:py-28">
            <div className="max-w-xl space-y-8">
              <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">L’Interstice</p>
              <h1 className="font-serif text-5xl leading-[1.05] md:text-6xl lg:text-7xl">
                Guillaume Canva
                <span className="mt-4 block max-w-md font-sans text-base font-normal leading-relaxed tracking-normal text-muted-foreground md:text-lg">
                  Développeur web et artiste visuel, à Tournai.
                </span>
              </h1>
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
                <p>
                  Mon travail repose sur deux grilles de lecture : la précision millimétrée du développement web et
                  l’énergie brute de l’expérimentation visuelle.
                </p>
                <p>
                  gcanva.art n’est pas un portfolio unique. C’est le seuil entre deux salles. Le{" "}
                  <span className="font-medium text-foreground">Studio</span> met la technique au service du besoin, de
                  l’ergonomie et des projets professionnels. Le <span className="font-medium text-foreground">Carnet</span>{" "}
                  laisse les idées pousser, muter et se mélanger sans contrainte.
                </p>
                <p className="font-medium text-foreground">Deux salles, deux ambiances.</p>
              </div>
            </div>
          </section>

          <div className="flex flex-col border-t border-border lg:min-h-[100svh] lg:flex-row lg:border-t-0 lg:border-l">
            <Door
              index="01"
              href={site.studioUrl}
              title="Studio"
              text="La technique au service du besoin. Intégration, ergonomie, projets professionnels."
              cta="Entrer dans le studio"
            />
            <Door
              index="02"
              href={site.carnetUrl}
              title="Carnet"
              text="Un espace organique. Dessins, peintures, expérimentations sans commande."
              cta="Ouvrir le carnet"
            />
          </div>
        </div>

        <section aria-labelledby="pratiques" className="border-t border-border px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 id="pratiques" className="font-serif text-4xl italic md:text-5xl">
                Deux pratiques, une adresse
              </h2>
              <p className="mt-6 max-w-prose leading-relaxed text-muted-foreground">
                Le Studio est la partie professionnelle. Le Carnet est la recherche visuelle. Les deux portent le même
                nom, et cette page indique laquelle ouvrir.
              </p>
            </div>
            <div className="space-y-10">
              <article>
                <h3 className="font-serif text-2xl italic">Le Studio</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  J’interviens depuis Tournai comme partenaire technique direct. Pas d’intermédiaire : une collaboration
                  transparente pour bâtir une présence web solide. L’approche est artisanale. Les technologies sont
                  choisies pour que l’interface reste fluide, durable et centrée sur l’usage.
                </p>
                <a href={site.studioUrl} className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground">
                  studio.gcanva.art
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
              <article>
                <h3 className="font-serif text-2xl italic">Le Carnet</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Dessins, peintures, infographies. Les notes avancent par sessions, sans brief. Une série au long cours
                  tourne autour d’Alice au pays des merveilles. D’autres suivent une obsession du moment : des mains, des
                  impressions sur textile, des voyages.
                </p>
                <a href={site.carnetUrl} className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground">
                  carnet.gcanva.art
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="atelier" className="border-t border-border px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 id="atelier" className="font-serif text-4xl italic md:text-5xl">
              Ce que je construis
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Trois chantiers reviennent dans chaque mission du studio. Le détail et les conditions sont sur la page
              Studio.
            </p>
            <ol className="mt-12 grid gap-10 md:grid-cols-3">
              {practices.map((item, index) => (
                <li key={item.title}>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground">0{index + 1}</p>
                  <h3 className="mt-3 text-lg font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-16 border-t border-border pt-10">
              <h3 className="text-sm tracking-[0.18em] uppercase text-muted-foreground">Réalisations</h3>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                <li>
                  <a
                    href={site.chauffageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-lg transition-colors group-hover:text-foreground">Tournai Chauffage</span>
                    <span className="text-sm text-muted-foreground">Site vitrine</span>
                  </a>
                </li>
                <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-lg">Infirmière à domicile</span>
                  <span className="text-sm text-muted-foreground">Maquette web</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="border-t border-border px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground">Contact</p>
            <h2 id="contact-title" className="mt-4 max-w-3xl font-serif text-4xl italic leading-tight md:text-6xl">
              Un site, une interface, ou une suite à donner à un projet.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Écrivez-moi directement. Le studio décrit les missions. Le carnet montre le travail visuel.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-10 inline-flex min-h-12 items-center border border-foreground px-6 py-3 text-base transition-colors hover:bg-foreground hover:text-background"
            >
              {site.email}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-8 md:px-12" role="contentinfo">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="text-foreground">gcanva.art</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            Tournai, Belgique
          </p>
          <nav aria-label="Sites" className="flex gap-5">
            <a href={site.studioUrl} className="hover:text-foreground">
              Studio
            </a>
            <a href={site.carnetUrl} className="hover:text-foreground">
              Carnet
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              E-mail
            </a>
          </nav>
        </div>
      </footer>
    </>
  )
}

function Door({
  index,
  href,
  title,
  text,
  cta,
}: {
  index: string
  href: string
  title: string
  text: string
  cta: string
}) {
  return (
    <a
      href={href}
      className="group relative flex min-h-[280px] flex-1 flex-col justify-end border-t border-border p-6 transition-colors duration-500 first:border-t-0 hover:bg-secondary/50 focus-visible:bg-secondary/40 md:p-8 lg:border-t-0 lg:border-l lg:p-12 lg:first:border-l-0"
    >
      <ArrowUpRight
        className="absolute top-24 right-6 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:right-8 lg:top-28 lg:right-12"
        aria-hidden="true"
      />
      <div className="space-y-4">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">{index}</span>
        <h2 className="font-serif text-4xl italic md:text-5xl">{title}</h2>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{text}</p>
        <p className="text-sm text-foreground">{cta}</p>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px bg-border" aria-hidden="true">
        <span className="block h-full w-0 bg-foreground transition-[width] duration-700 ease-out group-hover:w-full group-focus-visible:w-full" />
      </span>
    </a>
  )
}
