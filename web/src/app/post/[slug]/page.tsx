import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { defineQuery, PortableText, type PortableTextComponents } from "next-sanity";
import SiteHeader from "@/components/SiteHeader";
import PostGallery from "@/components/PostGallery";
import { client } from "@/sanity/client";
import { buildSeoMetadata, getSiteSettingsSeo, type SeoData } from "@/sanity/seo";

const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    title,
    "slug": coalesce(slug.current, _id),
    tags,
    lastTendedAt,
    imageCaption,
    content[]{
      ...,
      _type == "polaroidImage" => {
        ...,
        image {
          asset-> {
            url,
            metadata {
              lqip,
              dimensions { aspectRatio }
            }
          }
        }
      }
    },
    gallery[] {
      alt,
      caption,
      image {
        asset-> {
          url,
          metadata {
            lqip,
            dimensions { aspectRatio }
          }
        }
      }
    },
    mainImage {
      asset->{
        url,
        metadata {
          lqip,
          dimensions { aspectRatio }
        }
      }
    },
    "sections": contentSections[]{
      title,
      content[]{
        ...,
        _type == "polaroidImage" => {
          ...,
          image {
            asset-> {
              url,
              metadata {
                lqip,
                dimensions { aspectRatio }
              }
            }
          }
        }
      }
    }
  }
`);

const POST_SEO_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote" && (slug.current == $slug || _id == $slug)][0] {
    title,
    seo {
      title,
      description,
      keywords,
      canonicalUrl,
      noIndex,
      ogImage { asset->{url} }
    }
  }
`);

interface PostSeoData {
  title?: string;
  seo?: SeoData;
}

interface PostData {
  _id: string;
  title: string;
  slug: string;
  tags?: string[];
  lastTendedAt?: string;
  imageCaption?: string;
  gallery?: Array<{
    alt?: string;
    caption?: string;
    image?: {
      asset?: {
        url?: string;
        metadata?: {
          lqip?: string;
          dimensions?: {
            aspectRatio?: number;
          };
        };
      };
    };
  }>;
  mainImage?: {
    asset?: {
      url?: string;
      metadata?: {
        lqip?: string;
        dimensions?: {
          aspectRatio?: number;
        };
      };
    };
  };
  content?: any[];
  sections?: Array<{
    title?: string;
    content?: any[];
  }>;
}

const PORTABLE_TEXT_COMPONENTS: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="journal-prose-link"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => <code>{children}</code>,
  },
  types: {
    callout: ({ value }) => (
      <aside className="journal-callout" data-tone={value?.tone || "note"}>
        <p>{value?.text || ""}</p>
      </aside>
    ),
    polaroidImage: ({ value }) => {
      const imageUrl = value?.image?.asset?.url;
      if (!imageUrl) return null;

      return (
        <figure className="journal-polaroid">
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: value?.image?.asset?.metadata?.dimensions?.aspectRatio || 4 / 3 }}>
            <Image
              src={imageUrl}
              alt={value?.alt || "Image"}
              fill
              draggable={false}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              placeholder={value?.image?.asset?.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={value?.image?.asset?.metadata?.lqip}
            />
          </div>
          {value?.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre className="journal-code-block">
        <code>{value?.code || ""}</code>
      </pre>
    ),
  },
};

function formatDate(dateValue?: string) {
  if (!dateValue) return "";

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("fr-FR");
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const [postSeo, settings] = await Promise.all([
    client.fetch<PostSeoData | null>(POST_SEO_QUERY, { slug }),
    getSiteSettingsSeo(),
  ]);

  const metadata = buildSeoMetadata({
    pageSeo: postSeo?.seo,
    sectionSeo: settings?.postSeo,
    fallbackTitle: postSeo?.title ? `gcanva.art — ${postSeo.title}` : "gcanva.art — Note",
    fallbackDescription: "Lecture d'une note du carnet créatif gcanva.art.",
    settings,
  });

  const hasOgImage = Boolean(postSeo?.seo?.ogImage?.asset?.url || settings?.postSeo?.ogImage?.asset?.url || settings?.defaultSeo?.ogImage?.asset?.url);

  if (hasOgImage) {
    return metadata;
  }

  const dynamicOgPath = `/post/${slug}/opengraph-image`;

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: dynamicOgPath }],
    },
    twitter: {
      ...metadata.twitter,
      card: "summary_large_image",
      images: [dynamicOgPath],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    client.fetch<PostData | null>(POST_QUERY, { slug }),
    getSiteSettingsSeo(),
  ]);

  if (!post) {
    notFound();
  }

  const sections = (post.sections || [])
    .filter((section) => Array.isArray(section.content) && section.content.length > 0)
    .map((section, index) => ({
      id: `section-${index + 1}`,
      title: section.title || `Partie ${index + 1}`,
      content: section.content || [],
    }));

  const useSections = sections.length > 0;
  const galleryImages = (post.gallery || [])
    .map((item) => ({
      url: item.image?.asset?.url || "",
      alt: item.alt || post.title,
      caption: item.caption,
      blurDataURL: item.image?.asset?.metadata?.lqip,
      aspectRatio: item.image?.asset?.metadata?.dimensions?.aspectRatio,
    }))
    .filter((item) => item.url.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        siteTitle={settings?.brandTitle || settings?.siteName || "gcanva.art"}
        subtitle="Lecture d'une note"
        showViewModeControls={false}
      />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="article-page-wrapper rounded-2xl px-6 py-8 sm:rounded-3xl md:px-10 md:py-10">

          {/* Retour au carnet — barre discrète en haut */}
          <div className="flex flex-wrap items-center gap-3 pb-5">
            <Link
              href="/"
              className="article-back-link inline-flex min-h-[2.5rem] items-center gap-2 text-sm font-medium text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-1 -mx-1"
            >
              <span aria-hidden>←</span>
              Retour au carnet
            </Link>
          </div>

          <header className="mt-6 space-y-4">
            <h1 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {post.lastTendedAt && (
                <time dateTime={post.lastTendedAt}>{formatDate(post.lastTendedAt)}</time>
              )}
              {!!post.tags?.length && (
                <span className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post._id}-${tag}`}
                      className="rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </header>

          {post.mainImage?.asset?.url && (
            <figure className="article-card group relative mt-8 overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.01]">
              <div className="card-corner-decoration" />
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: post.mainImage.asset.metadata?.dimensions?.aspectRatio || 16 / 9 }}
              >
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  placeholder={post.mainImage.asset.metadata?.lqip ? "blur" : "empty"}
                  blurDataURL={post.mainImage.asset.metadata?.lqip}
                />
                <div className="card-image-overlay rounded-none" />
              </div>
              {post.imageCaption && (
                <figcaption className="px-5 pb-4 pt-3 text-sm text-muted-foreground">
                  {post.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {useSections ? (
            <div className="mt-10 space-y-10">
              <nav aria-label="Sommaire de l'article" className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="article-section-anchor min-h-[2.5rem] rounded-full bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
              {sections.map((section) => (
                <article
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-24 rounded-2xl p-6 sm:p-8"
                >
                  <h2 className="mb-4 text-xl font-semibold text-foreground sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="journal-prose">
                    <PortableText value={section.content} components={PORTABLE_TEXT_COMPONENTS} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <article className="mt-10 rounded-2xl p-6 sm:p-8">
              <div className="journal-prose">
                <PortableText value={post.content || []} components={PORTABLE_TEXT_COMPONENTS} />
              </div>
            </article>
          )}

          {galleryImages.length > 0 && (
            <PostGallery images={galleryImages} className="mt-12" />
          )}
        </div>
      </main>
    </div>
  );
}
