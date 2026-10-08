export const site = {
  name: "gcanva.art",
  url: "https://www.gcanva.art",
  title: "Guillaume Canva, développeur web et artiste visuel",
  description:
    "Guillaume Canva, à Tournai : intégration web dans le Studio, dessins et expérimentations dans le Carnet. L’interstice entre les deux, sur gcanva.art.",
  person: "Guillaume Canva",
  jobTitle: "Développeur web et artiste visuel",
  locality: "Tournai",
  country: "BE",
  email: "guillaume.canva@gmail.com",
  studioUrl: "https://studio.gcanva.art",
  carnetUrl: "https://carnet.gcanva.art",
  chauffageUrl: "https://www.tournai-chauffage.be",
} as const

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#guillaume-canva`,
      name: site.person,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.jobTitle,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressCountry: site.country,
      },
      knowsAbout: ["Intégration web", "Performance web", "Ergonomie", "Dessin", "Peinture"],
      sameAs: [site.studioUrl, site.carnetUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "fr-BE",
      publisher: { "@id": `${site.url}/#guillaume-canva` },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "fr-BE",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#guillaume-canva` },
    },
  ],
}
