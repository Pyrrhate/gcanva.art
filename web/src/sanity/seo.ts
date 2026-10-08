import {cache} from 'react'
import type {Metadata} from 'next'
import {defineQuery} from 'next-sanity'
import {normalizeSiteUrl} from '@/lib/site'
import {client} from '@/sanity/client'

export interface SeoData {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  noIndex?: boolean
  ogImage?: {
    asset?: {
      url?: string
    }
  }
}

export interface SiteSettingsSeo {
  brandTitle?: string
  siteName?: string
  siteUrl?: string
  socialLinks?: Array<{
    label?: string
    url?: string
  }>
  defaultSeo?: SeoData
  homeSeo?: SeoData
  manifesteSeo?: SeoData
  experimentationSeo?: SeoData
  contactSeo?: SeoData
  postSeo?: SeoData
}

const SITE_SETTINGS_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    brandTitle,
    siteName,
    siteUrl,
    socialLinks[]{label, url},
    defaultSeo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    },
    homeSeo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    },
    manifesteSeo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    },
    experimentationSeo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    },
    contactSeo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    },
    postSeo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    }
  }
`)

export const getSiteSettingsSeo = cache(async () => {
  return client.fetch<SiteSettingsSeo | null>(SITE_SETTINGS_SEO_QUERY)
})

export function buildSeoMetadata({
  pageSeo,
  sectionSeo,
  fallbackTitle,
  fallbackDescription,
  settings,
  path,
  forceNoIndex = false,
  publishedTime,
  modifiedTime,
}: {
  pageSeo?: SeoData
  sectionSeo?: SeoData
  fallbackTitle: string
  fallbackDescription: string
  settings?: SiteSettingsSeo | null
  /** Chemin de la page (ex. "/post/les-mains"). Sert à la canonique et à og:url. */
  path?: string
  /** Désindexe la page même si le module SEO ne le demande pas (notes sans texte). */
  forceNoIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const defaultSeo = settings?.defaultSeo
  const siteName = settings?.siteName || 'gcanva.art'
  const siteUrl = normalizeSiteUrl(settings?.siteUrl)

  const title = pageSeo?.title || sectionSeo?.title || defaultSeo?.title || fallbackTitle
  const description =
    pageSeo?.description || sectionSeo?.description || defaultSeo?.description || fallbackDescription

  const keywords =
    pageSeo?.keywords || sectionSeo?.keywords || defaultSeo?.keywords || undefined

  const canonicalUrl =
    pageSeo?.canonicalUrl ||
    sectionSeo?.canonicalUrl ||
    defaultSeo?.canonicalUrl ||
    (path ? `${siteUrl}${path === '/' ? '' : path}` : undefined)

  const ogImage =
    pageSeo?.ogImage?.asset?.url ||
    sectionSeo?.ogImage?.asset?.url ||
    defaultSeo?.ogImage?.asset?.url ||
    undefined

  const noIndex =
    forceNoIndex || (pageSeo?.noIndex ?? sectionSeo?.noIndex ?? defaultSeo?.noIndex ?? false)

  const isArticle = Boolean(publishedTime || modifiedTime)

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      types: {
        'application/rss+xml': `${siteUrl}/rss.xml`,
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      siteName,
      locale: 'fr_BE',
      url: canonicalUrl,
      images: ogImage ? [{url: ogImage}] : undefined,
      ...(isArticle
        ? {type: 'article', publishedTime, modifiedTime, authors: ['Guillaume Canva']}
        : {type: 'website'}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
