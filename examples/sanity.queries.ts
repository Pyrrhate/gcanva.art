// Exemples de requêtes GROQ pour interroger vos données Sanity

import { client } from './sanityClient'

// 1. Récupérer toutes les pages
export async function getAllPages() {
  return await client.fetch(`
    *[_type == "page"] {
      _id,
      title,
      "slug": slug.current,
      seo
    }
  `)
}

// 2. Récupérer une page spécifique avec tout son contenu
export async function getPage(slug: string) {
  return await client.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      seo {
        metaTitle,
        metaDescription,
        ogImage {
          "url": asset->url,
          "alt": asset->alt
        }
      },
      pageBuilder[] {
        _type,
        
        // Hero
        _type == "hero" => {
          title,
          subtitle,
          image {
            "url": asset->url,
            alt
          },
          cta {
            text,
            link
          }
        },
        
        // TextContent
        _type == "textContent" => {
          title,
          body,
          alignment
        },
        
        // Gallery
        _type == "gallery" => {
          title,
          layout,
          columns,
          images[] {
            "url": asset->url,
            alt,
            caption
          }
        },
        
        // ContactForm
        _type == "contactForm" => {
          title,
          subtitle,
          fields,
          submitButtonText,
          emailTo
        }
      }
    }
  `,
    { slug }
  )
}

// 3. Récupérer les paramètres du site (singleton)
export async function getSiteSettings() {
  return await client.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      logo {
        "url": asset->url,
        alt
      },
      favicon {
        "url": asset->url
      },
      seo {
        metaTitle,
        metaDescription,
        keywords,
        ogImage {
          "url": asset->url
        }
      },
      socialMedia,
      contact,
      googleAnalytics
    }
  `)
}

// 4. Récupérer les slugs de toutes les pages (utile pour generateStaticParams)
export async function getAllPageSlugs() {
  return await client.fetch(`
    *[_type == "page"] {
      "slug": slug.current
    }
  `)
}

// 5. Rechercher des pages par titre
export async function searchPages(query: string) {
  return await client.fetch(
    `
    *[_type == "page" && title match $query] {
      _id,
      title,
      "slug": slug.current,
      seo {
        metaDescription
      }
    }
  `,
    { query: `${query}*` }
  )
}

// 6. Récupérer une page avec prévisualisation (draft)
export async function getPagePreview(slug: string) {
  return await client.fetch(
    `
    *[_type == "page" && slug.current == $slug] | order(_updatedAt desc) [0] {
      title,
      "slug": slug.current,
      seo,
      pageBuilder[] {
        _type,
        _type == "hero" => {
          title,
          subtitle,
          image {
            "url": asset->url,
            alt
          },
          cta
        },
        _type == "textContent" => {
          title,
          body,
          alignment
        },
        _type == "gallery" => {
          title,
          layout,
          columns,
          images[] {
            "url": asset->url,
            alt,
            caption
          }
        },
        _type == "contactForm" => {
          title,
          subtitle,
          fields,
          submitButtonText,
          emailTo
        }
      }
    }
  `,
    { slug }
  )
}

// 7. Compter le nombre total de pages
export async function countPages() {
  return await client.fetch(`count(*[_type == "page"])`)
}

// 8. Récupérer les dernières pages publiées
export async function getLatestPages(limit: number = 5) {
  return await client.fetch(
    `
    *[_type == "page"] | order(_createdAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      _createdAt,
      seo {
        metaDescription
      }
    }
  `,
    { limit: limit - 1 }
  )
}

// 9. Récupérer toutes les images d'une galerie spécifique
export async function getGalleryImages(pageSlug: string) {
  return await client.fetch(
    `
    *[_type == "page" && slug.current == $pageSlug][0] {
      "galleries": pageBuilder[_type == "gallery"] {
        title,
        images[] {
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          alt,
          caption
        }
      }
    }
  `,
    { pageSlug }
  )
}

// 10. Validation - Vérifier si un slug existe déjà
export async function slugExists(slug: string, excludeId?: string) {
  const query = excludeId
    ? `*[_type == "page" && slug.current == $slug && _id != $excludeId][0]`
    : `*[_type == "page" && slug.current == $slug][0]`

  const result = await client.fetch(query, { slug, excludeId })
  return !!result
}
