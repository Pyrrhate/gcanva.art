import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre SEO',
      type: 'string',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'keywords',
      title: 'Mots-clés',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'URL canonique',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'noIndex',
      title: 'No index',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      noIndex: 'noIndex',
    },
    prepare({title, description, noIndex}) {
      return {
        title: title || 'SEO',
        subtitle: `${noIndex ? 'Noindex' : 'Index'} · ${description || 'Sans description'}`,
      }
    },
  },
})
