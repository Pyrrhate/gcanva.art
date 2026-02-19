import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'brandTitle',
      title: 'Titre de marque (Header)',
      type: 'string',
      initialValue: 'gcanva.art',
      description: 'Texte affiché en haut du site.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      initialValue: 'gcanva.art',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'siteUrl',
      title: 'URL du site',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'array',
      description: 'Liens affichés dans le footer (non affichés si la liste est vide).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Libellé',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(40),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'SEO par défaut',
      type: 'seo',
      description: 'Valeurs fallback utilisées si une page n\'a pas ses propres champs SEO.',
    }),
    defineField({
      name: 'homeSeo',
      title: 'SEO · Carnet (Accueil)',
      type: 'seo',
    }),
    defineField({
      name: 'manifesteSeo',
      title: 'SEO · Manifeste',
      type: 'seo',
    }),
    defineField({
      name: 'experimentationSeo',
      title: 'SEO · Expérimentation Digitale',
      type: 'seo',
    }),
    defineField({
      name: 'contactSeo',
      title: 'SEO · Contact',
      type: 'seo',
    }),
    defineField({
      name: 'postSeo',
      title: 'SEO · Notes (Fallback)',
      type: 'seo',
      description: 'Fallback des pages de notes si une note n\'a pas de module SEO dédié.',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteUrl',
    },
  },
})
