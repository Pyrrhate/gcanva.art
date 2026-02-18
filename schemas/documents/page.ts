import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Paramètres SEO spécifiques à cette page',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Titre',
          type: 'string',
          description: 'Titre pour les moteurs de recherche (60 caractères max)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description pour les moteurs de recherche (160 caractères max)',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Image Open Graph',
          type: 'image',
          description: 'Image pour les partages sur les réseaux sociaux',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Constructeur de Page',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'textContent' },
        { type: 'gallery' },
        { type: 'contactForm' },
        // Ajouter facilement de nouveaux blocs ici
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title,
        subtitle: `/${slug || ''}`,
      }
    },
  },
})
