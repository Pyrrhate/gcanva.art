import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import SiteHeader from "@/components/SiteHeader";
import PostGallery from "@/components/PostGallery";
import { client } from "@/sanity/client";
import { buildSeoMetadata, getSiteSettingsSeo, type SeoData } from "@/sanity/seo";

const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    title,
    "slug": coalesce(slug.current, _id),
    lastTendedAt,
    displayMode,
    imageCaption,
    gallery[] {
      alt,
      caption,
      image {
        asset-> {
          url,
          metadata {
            dimensions { aspectRatio }
          }
        }
      }
    },
    mainImage {
      asset->{
        url,
        metadata {
          dimensions { aspectRatio }
        }
      }
    },
    "contentText": pt::text(content),
    "sections": contentSections[]{
      title,
      "contentText": pt::text(content)
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
  lastTendedAt?: string;
  displayMode?: "auto" | "single" | "sectioned";
  imageCaption?: string;
  gallery?: Array<{
    alt?: string;
    caption?: string;
    image?: {
      asset?: {
        url?: string;
        metadata?: {
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
        dimensions?: {
          aspectRatio?: number;
        };
      };
    };
  };
  contentText?: string;
  sections?: Array<{
    title?: string;
    contentText?: string;
  }>;
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

  return buildSeoMetadata({
    pageSeo: postSeo?.seo,
    sectionSeo: settings?.postSeo,
    fallbackTitle: postSeo?.title ? `gcanva.art — ${postSeo.title}` : "gcanva.art — Note",
    fallbackDescription: "Lecture d'une note du carnet créatif gcanva.art.",
    settings,
  });
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
    .filter((section) => (section.contentText || "").trim().length > 0)
    .map((section, index) => ({
      id: `section-${index + 1}`,
      title: section.title || `Partie ${index + 1}`,
      content: section.contentText || "",
    }));

  const useSections = post.displayMode === "sectioned" && sections.length > 0;
  const galleryImages = (post.gallery || [])
    .map((item) => ({
      url: item.image?.asset?.url || "",
      alt: item.alt || post.title,
      caption: item.caption,
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
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="text-sm text-primary hover:underline"
        >
          ← Retour au carnet
        </Link>

      <header className="mt-6 space-y-3">
        <h1 className="text-balance text-4xl font-semibold text-foreground">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          {post.lastTendedAt ? new Date(post.lastTendedAt).toLocaleDateString("fr-FR") : ""}
        </p>
      </header>

      {post.mainImage?.asset?.url && (
        <figure className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-3 shadow-sm">
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: post.mainImage.asset.metadata?.dimensions?.aspectRatio || 16 / 9 }}
          >
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
          {post.imageCaption && <figcaption className="mt-3 text-sm text-muted-foreground">{post.imageCaption}</figcaption>}
        </figure>
      )}

        {useSections ? (
          <section className="mt-10 space-y-10">
            <nav className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-primary"
                >
                  {section.title}
                </a>
              ))}
            </nav>
            {sections.map((section) => (
              <article
                id={section.id}
                key={section.id}
                className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm"
              >
                <h2 className="mb-3 text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">{section.content}</p>
              </article>
            ))}
          </section>
        ) : (
          <article className="mt-10 rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm">
            <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">{post.contentText || ""}</p>
          </article>
        )}

        <PostGallery images={galleryImages} />
      </main>
    </div>
  );
}
