import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du Site',
  type: 'document',
  // Configuration singleton
  __experimental_actions: ['create', 'update', /* 'delete', 'publish' */],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Icône du site (format .ico ou .png)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Global',
      type: 'object',
      description: 'Paramètres SEO par défaut pour tout le site',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Titre par défaut',
          type: 'string',
          description: 'Titre par défaut pour les moteurs de recherche',
          validation: (Rule) => Rule.required().max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description par défaut',
          type: 'text',
          rows: 3,
          description: 'Description par défaut pour les moteurs de recherche',
          validation: (Rule) => Rule.required().max(160),
        },
        {
          name: 'keywords',
          title: 'Mots-clés',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Mots-clés principaux du site',
        },
        {
          name: 'ogImage',
          title: 'Image Open Graph par défaut',
          type: 'image',
          description: 'Image par défaut pour les partages sur les réseaux sociaux',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialMedia',
      title: 'Réseaux Sociaux',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'URL de votre page Facebook',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'URL de votre profil Instagram',
        },
        {
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url',
          description: 'URL de votre profil Twitter/X',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL de votre profil LinkedIn',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'URL de votre chaîne YouTube',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'url',
          description: 'URL de votre profil TikTok',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Informations de Contact',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Téléphone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'text',
          rows: 3,
        },
      ],
    }),
    defineField({
      name: 'googleAnalytics',
      title: 'ID Google Analytics',
      type: 'string',
      description: 'Ex: G-XXXXXXXXXX ou UA-XXXXXXXXX-X',
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Paramètres du Site',
        media: media,
      }
    },
  },
})
