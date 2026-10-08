import { AUTHOR, CARNET_URL, hasBody, normalizeSiteUrl, PERSON_ID, PORTAL_URL, STUDIO_URL, toExcerpt } from "@/lib/site";
import type { SiteSettingsSeo } from "@/sanity/seo";

export interface JsonLdImageAsset {
  url?: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
}

export interface JsonLdNote {
  _id: string;
  _createdAt?: string;
  title: string;
  slug: string;
  tags?: string[];
  lastTendedAt?: string;
  imageCaption?: string;
  contentText?: string;
  mainImage?: {
    alt?: string;
    asset?: JsonLdImageAsset;
  };
  gallery?: Array<{
    alt?: string;
    caption?: string;
    image?: { asset?: JsonLdImageAsset };
  }>;
  artwork?: {
    medium?: string;
    surface?: string;
    width?: number;
    height?: number;
    unit?: string;
    dateCreated?: string;
  };
  relatedNotes?: Array<{
    title?: string;
    slug?: string;
  }>;
  sections?: Array<{ title?: string }>;
}

type JsonLdValue = Record<string, unknown>;

const ARTFORM_BY_TAG: Record<string, string> = {
  dessin: "Drawing",
  peinture: "Painting",
  infographie: "Digital art",
};

function compact<T extends JsonLdValue>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    }),
  ) as T;
}

export function noteUrl(siteUrl: string, slug: string) {
  return `${siteUrl}/post/${encodeURIComponent(slug)}`;
}

function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: AUTHOR.name,
    url: PORTAL_URL,
    jobTitle: AUTHOR.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: AUTHOR.locality,
      addressCountry: AUTHOR.country,
    },
    sameAs: [STUDIO_URL, CARNET_URL],
  };
}

function websiteJsonLd(siteUrl: string, siteName: string) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    inLanguage: "fr-BE",
    publisher: { "@id": PERSON_ID },
  };
}

function imageObject(asset?: JsonLdImageAsset, alt?: string, caption?: string) {
  if (!asset?.url) return undefined;
  return compact({
    "@type": "ImageObject",
    url: asset.url,
    contentUrl: asset.url,
    width: asset.metadata?.dimensions?.width,
    height: asset.metadata?.dimensions?.height,
    name: alt,
    caption: caption,
  });
}

function quantitative(value?: number, unit?: string) {
  if (!value) return undefined;
  return compact({
    "@type": "QuantitativeValue",
    value,
    unitText: unit || "cm",
  });
}

/* lastTendedAt est parfois antérieur de quelques secondes à la création : la date de modification ne doit jamais précéder la publication. */
function publicationDates(note: JsonLdNote) {
  const published = note._createdAt;
  const tended = note.lastTendedAt;
  if (!published) return { datePublished: tended, dateModified: tended };
  if (!tended || new Date(tended) < new Date(published)) {
    return { datePublished: published, dateModified: published };
  }
  return { datePublished: published, dateModified: tended };
}

function cleanText(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function artforms(tags?: string[]) {
  return (tags || []).map((tag) => ARTFORM_BY_TAG[tag]).filter((v): v is string => Boolean(v));
}

export function visualArtworkJsonLd(note: JsonLdNote, siteUrl: string) {
  const pageUrl = noteUrl(siteUrl, note.slug);
  const mainImage = imageObject(note.mainImage?.asset, note.mainImage?.alt || note.title, note.imageCaption);
  if (!mainImage) return undefined;

  const galleryImages = (note.gallery || [])
    .map((item) => imageObject(item.image?.asset, item.alt || note.title, item.caption))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const forms = artforms(note.tags);
  const artwork = note.artwork;

  return compact({
    "@type": "VisualArtwork",
    "@id": `${pageUrl}#artwork`,
    name: note.title,
    url: pageUrl,
    image: [mainImage, ...galleryImages],
    creator: { "@id": PERSON_ID },
    artform: forms.length === 1 ? forms[0] : forms.length > 1 ? forms : undefined,
    artMedium: artwork?.medium,
    artworkSurface: artwork?.surface,
    width: quantitative(artwork?.width, artwork?.unit),
    height: quantitative(artwork?.height, artwork?.unit),
    dateCreated: artwork?.dateCreated,
    description: toExcerpt(note.contentText) || cleanText(note.imageCaption),
    inLanguage: "fr",
  });
}

export function blogPostingJsonLd(note: JsonLdNote, siteUrl: string) {
  if (!hasBody(note.contentText)) return undefined;

  const pageUrl = noteUrl(siteUrl, note.slug);
  const mainImage = imageObject(note.mainImage?.asset, note.mainImage?.alt || note.title, note.imageCaption);
  const related = (note.relatedNotes || [])
    .filter((item) => item.slug && cleanText(item.title))
    .map((item) => ({
      "@type": "BlogPosting",
      "@id": `${noteUrl(siteUrl, item.slug as string)}#post`,
      headline: cleanText(item.title),
      url: noteUrl(siteUrl, item.slug as string),
    }));

  return compact({
    "@type": "BlogPosting",
    "@id": `${pageUrl}#post`,
    headline: note.title.trim(),
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    ...publicationDates(note),
    description: toExcerpt(note.contentText),
    articleBody: (note.contentText || "").trim(),
    keywords: (note.tags || []).join(", ") || undefined,
    image: mainImage,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": `${siteUrl}/#blog` },
    about: mainImage ? { "@id": `${pageUrl}#artwork` } : undefined,
    hasPart: (note.sections || [])
      .map((section) => cleanText(section.title))
      .filter((title): title is string => Boolean(title))
      .map((title) => ({ "@type": "WebPageElement", name: title })),
    isRelatedTo: related,
    inLanguage: "fr",
  });
}

function breadcrumbJsonLd(note: JsonLdNote, siteUrl: string, siteName: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: siteUrl },
      { "@type": "ListItem", position: 2, name: note.title.trim(), item: noteUrl(siteUrl, note.slug) },
    ],
  };
}

export function buildNoteJsonLd(note: JsonLdNote, settings?: SiteSettingsSeo | null) {
  const siteUrl = normalizeSiteUrl(settings?.siteUrl);
  const siteName = settings?.siteName || "Carnet gcanva.art";

  const graph: JsonLdValue[] = [personJsonLd(), websiteJsonLd(siteUrl, siteName), breadcrumbJsonLd(note, siteUrl, siteName)];

  const artwork = visualArtworkJsonLd(note, siteUrl);
  if (artwork) graph.push(artwork);

  const post = blogPostingJsonLd(note, siteUrl);
  if (post) graph.push(post);

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildCarnetJsonLd(notes: JsonLdNote[], settings?: SiteSettingsSeo | null) {
  const siteUrl = normalizeSiteUrl(settings?.siteUrl);
  const siteName = settings?.siteName || "Carnet gcanva.art";

  const posts = notes.filter((note) => hasBody(note.contentText));

  return {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      websiteJsonLd(siteUrl, siteName),
      compact({
        "@type": "Blog",
        "@id": `${siteUrl}/#blog`,
        url: siteUrl,
        name: siteName,
        description: "Dessins, peintures et expérimentations visuelles de Guillaume Canva.",
        inLanguage: "fr-BE",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": `${siteUrl}/#website` },
        blogPost: posts.map((note) =>
          compact({
            "@type": "BlogPosting",
            "@id": `${noteUrl(siteUrl, note.slug)}#post`,
            headline: note.title.trim(),
            url: noteUrl(siteUrl, note.slug),
            ...publicationDates(note),
            image: note.mainImage?.asset?.url,
            keywords: (note.tags || []).join(", ") || undefined,
            author: { "@id": PERSON_ID },
          }),
        ),
      }),
    ],
  };
}
