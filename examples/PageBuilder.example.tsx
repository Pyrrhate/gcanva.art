// Exemple d'utilisation du Page Builder dans un composant React/Next.js

import Image from 'next/image'
import { PortableText } from '@portabletext/react'

// Types TypeScript pour le Page Builder
interface HeroBlock {
  _type: 'hero'
  title: string
  subtitle?: string
  image: {
    asset: {
      url: string
    }
    alt: string
  }
  cta?: {
    text: string
    link: string
  }
}

interface TextContentBlock {
  _type: 'textContent'
  title?: string
  body: any[] // Portable Text
  alignment: 'left' | 'center' | 'right'
}

interface GalleryBlock {
  _type: 'gallery'
  title?: string
  layout: 'grid' | 'carousel' | 'masonry'
  columns?: number
  images: Array<{
    url: string
    alt: string
    caption?: string
  }>
}

interface ContactFormBlock {
  _type: 'contactForm'
  title: string
  subtitle?: string
  fields: Array<{
    fieldName: string
    fieldType: string
    placeholder?: string
    required: boolean
  }>
  submitButtonText: string
  emailTo?: string
}

type PageBuilderBlock = HeroBlock | TextContentBlock | GalleryBlock | ContactFormBlock

interface Page {
  title: string
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: {
      asset: {
        url: string
      }
    }
  }
  pageBuilder: PageBuilderBlock[]
}

// Composant pour rendre un bloc Hero
const HeroComponent = ({ block }: { block: HeroBlock }) => (
  <section className="hero">
    <div className="hero-image">
      <Image
        src={block.image.asset.url}
        alt={block.image.alt}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
    <div className="hero-content">
      <h1>{block.title}</h1>
      {block.subtitle && <p>{block.subtitle}</p>}
      {block.cta && (
        <a href={block.cta.link} className="cta-button">
          {block.cta.text}
        </a>
      )}
    </div>
  </section>
)

// Composant pour rendre un bloc TextContent
const TextContentComponent = ({ block }: { block: TextContentBlock }) => (
  <section className={`text-content align-${block.alignment}`}>
    {block.title && <h2>{block.title}</h2>}
    <div className="portable-text">
      <PortableText value={block.body} />
    </div>
  </section>
)

// Composant pour rendre un bloc Gallery
const GalleryComponent = ({ block }: { block: GalleryBlock }) => (
  <section className="gallery">
    {block.title && <h2>{block.title}</h2>}
    <div className={`gallery-${block.layout}`} style={{ 
      gridTemplateColumns: block.layout === 'grid' && block.columns 
        ? `repeat(${block.columns}, 1fr)` 
        : undefined 
    }}>
      {block.images.map((image, index) => (
        <figure key={index}>
          <Image
            src={image.url}
            alt={image.alt}
            width={600}
            height={400}
            style={{ objectFit: 'cover' }}
          />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      ))}
    </div>
  </section>
)

// Composant pour rendre un bloc ContactForm
const ContactFormComponent = ({ block }: { block: ContactFormBlock }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Logique d'envoi du formulaire
    const formData = new FormData(e.currentTarget)
    // ... traitement
  }

  return (
    <section className="contact-form">
      <h2>{block.title}</h2>
      {block.subtitle && <p>{block.subtitle}</p>}
      <form onSubmit={handleSubmit}>
        {block.fields.map((field, index) => (
          <div key={index} className="form-field">
            <label htmlFor={field.fieldName}>
              {field.fieldName}
              {field.required && ' *'}
            </label>
            {field.fieldType === 'textarea' ? (
              <textarea
                id={field.fieldName}
                name={field.fieldName}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <input
                type={field.fieldType}
                id={field.fieldName}
                name={field.fieldName}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button type="submit">{block.submitButtonText}</button>
      </form>
    </section>
  )
}

// Composant principal qui rend tout le Page Builder
export const PageBuilder = ({ blocks }: { blocks: PageBuilderBlock[] }) => {
  return (
    <div className="page-builder">
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'hero':
            return <HeroComponent key={index} block={block} />
          case 'textContent':
            return <TextContentComponent key={index} block={block} />
          case 'gallery':
            return <GalleryComponent key={index} block={block} />
          case 'contactForm':
            return <ContactFormComponent key={index} block={block} />
          default:
            return null
        }
      })}
    </div>
  )
}

// Exemple d'utilisation dans une page Next.js
export default function PageTemplate({ page }: { page: Page }) {
  return (
    <>
      <head>
        <title>{page.seo.metaTitle || page.title}</title>
        <meta name="description" content={page.seo.metaDescription || ''} />
        {page.seo.ogImage && (
          <meta property="og:image" content={page.seo.ogImage.asset.url} />
        )}
      </head>
      <main>
        <PageBuilder blocks={page.pageBuilder} />
      </main>
    </>
  )
}
