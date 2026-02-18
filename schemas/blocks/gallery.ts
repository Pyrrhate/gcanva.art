import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galerie',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Légende',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          { title: 'Grille', value: 'grid' },
          { title: 'Carrousel', value: 'carousel' },
          { title: 'Mosaïque', value: 'masonry' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'columns',
      title: 'Nombre de colonnes',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(6),
      initialValue: 3,
      hidden: ({ parent }) => parent?.layout !== 'grid',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
    },
    prepare({ title, images }) {
      return {
        title: title || 'Galerie',
        subtitle: `${images?.length || 0} image(s)`,
        media: images?.[0],
      }
    },
  },
})
