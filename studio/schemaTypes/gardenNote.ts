import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'gardenNote',
  title: 'Garden Note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(180),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Dessin', value: 'dessin'},
          {title: 'Peinture', value: 'peinture'},
          {title: 'Infographie', value: 'infographie'},
          {title: 'Projets', value: 'projets'},
        ],
      },
      initialValue: ['projets'],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Module SEO pour la page dédiée de cette note.',
    }),
    defineField({
      name: 'lastTendedAt',
      title: 'Last Tended At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageCaption',
      title: 'Image Caption',
      type: 'string',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery (optional)',
      type: 'array',
      description: 'Galerie d\'images affichée dans la page longue de la note.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required().min(3).max(180),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (Rule) => Rule.max(180),
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              subtitle: 'alt',
            },
            prepare({title, media, subtitle}) {
              return {
                title: title || 'Image de galerie',
                subtitle,
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          name: 'callout',
          title: 'Callout',
          type: 'object',
          fields: [
            defineField({
              name: 'tone',
              title: 'Tone',
              type: 'string',
              options: {
                list: [
                  {title: 'Note', value: 'note'},
                  {title: 'Tip', value: 'tip'},
                  {title: 'Warning', value: 'warning'},
                ],
                layout: 'radio',
              },
              initialValue: 'note',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {tone: 'tone', text: 'text'},
            prepare({tone, text}) {
              return {
                title: `Callout · ${(tone || 'note').toUpperCase()}`,
                subtitle: text,
              }
            },
          },
        }),
        defineArrayMember({
          name: 'polaroidImage',
          title: 'Polaroid Image',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required().min(3),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'caption', media: 'image'},
            prepare({title, media}) {
              return {
                title: title || 'Polaroid Image',
                media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections (optional)',
      type: 'array',
      description:
        'Optionnel. Scinde une note en sections affichées uniquement sur la page de l\'article (pas à l\'accueil).',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(80),
            }),
            defineField({
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare({title}) {
              return {
                title: title || 'Section',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedNotes',
      title: 'Related Notes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'gardenNote'}],
          weak: true,
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tended: 'lastTendedAt',
    },
    prepare({title, tended}) {
      const date = tended ? new Date(tended).toLocaleDateString() : 'Untended'

      return {
        title,
        subtitle: date,
      }
    },
  },
})
