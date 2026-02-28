import {cache} from 'react'
import type {Metadata} from 'next'
import {defineQuery} from 'next-sanity'
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

function toMetadataBase(siteUrl?: string): URL | undefined {
  if (!siteUrl) return undefined
  try {
    return new URL(siteUrl)
  } catch {
    return undefined
  }
}

export function buildSeoMetadata({
  pageSeo,
  sectionSeo,
  fallbackTitle,
  fallbackDescription,
  settings,
}: {
  pageSeo?: SeoData
  sectionSeo?: SeoData
  fallbackTitle: string
  fallbackDescription: string
  settings?: SiteSettingsSeo | null
}): Metadata {
  const defaultSeo = settings?.defaultSeo
  const siteName = settings?.siteName || 'gcanva.art'

  const title = pageSeo?.title || sectionSeo?.title || defaultSeo?.title || fallbackTitle
  const description =
    pageSeo?.description || sectionSeo?.description || defaultSeo?.description || fallbackDescription

  const keywords =
    pageSeo?.keywords || sectionSeo?.keywords || defaultSeo?.keywords || undefined

  const canonicalUrl =
    pageSeo?.canonicalUrl || sectionSeo?.canonicalUrl || defaultSeo?.canonicalUrl || undefined

  const ogImage =
    pageSeo?.ogImage?.asset?.url ||
    sectionSeo?.ogImage?.asset?.url ||
    defaultSeo?.ogImage?.asset?.url ||
    undefined

  const noIndex = pageSeo?.noIndex ?? sectionSeo?.noIndex ?? defaultSeo?.noIndex ?? false

  const metadataBase = toMetadataBase(settings?.siteUrl)

  return {
    metadataBase,
    title,
    description,
    keywords,
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,
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
      images: ogImage ? [{url: ogImage}] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
