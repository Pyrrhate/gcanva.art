import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'feedItem',
  title: 'Feed Item',
  type: 'document',
  fields: [
    // ===== BASE FIELDS =====
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
      description: 'Item title (required)',
    }),

    defineField({
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Image', value: 'image' },
          { title: 'Music', value: 'music' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // ===== CONDITIONAL FIELDS FOR "TEXT" =====
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'text',
      rows: 8,
      hidden: ({ document }) => document?.type !== 'text',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.type === 'text' && !value) {
            return 'Text content is required for text items'
          }
          return true
        }),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'text',
      description: 'Author name for text items',
    }),

    // ===== CONDITIONAL FIELDS FOR "IMAGE" =====
    defineField({
      name: 'imageFile',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.type !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.type === 'image' && !value) {
            return 'Image is required for image items'
          }
          return true
        }),
    }),

    defineField({
      name: 'imageCaption',
      title: 'Image Caption',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'image',
      description: 'Optional caption for the image',
    }),

    // ===== CONDITIONAL FIELDS FOR "MUSIC" =====
    defineField({
      name: 'musicArtist',
      title: 'Artist',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'music',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.type === 'music' && !value) {
            return 'Artist name is required for music items'
          }
          return true
        }),
    }),

    defineField({
      name: 'musicCover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.type !== 'music',
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      hidden: ({ document }) => document?.type !== 'music',
      description: 'Format: MM:SS (e.g., 3:45)',
    }),

    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'music',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
    }),

    defineField({
      name: 'musicDescription',
      title: 'Description',
      type: 'text',
      rows: 5,
      hidden: ({ document }) => document?.type !== 'music',
    }),

    defineField({
      name: 'audioUrl',
      title: 'Audio File URL',
      type: 'url',
      hidden: ({ document }) => document?.type !== 'music',
      validation: (Rule) => Rule.uri({ scheme: ['https'] }),
      description: 'Optional: Direct link to audio file',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      type: 'type',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, type, publishedAt } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Unpublished'
      return {
        title,
        subtitle: `${type?.toUpperCase()} • ${date}`,
      }
    },
  },
})
