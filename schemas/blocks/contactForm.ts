import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Formulaire de Contact',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fields',
      title: 'Champs du formulaire',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fieldName',
              title: 'Nom du champ',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'fieldType',
              title: 'Type de champ',
              type: 'string',
              options: {
                list: [
                  { title: 'Texte', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Téléphone', value: 'tel' },
                  { title: 'Zone de texte', value: 'textarea' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            },
            {
              name: 'required',
              title: 'Champ obligatoire',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'fieldName',
              subtitle: 'fieldType',
            },
          },
        },
      ],
      initialValue: [
        {
          fieldName: 'Nom',
          fieldType: 'text',
          placeholder: 'Votre nom',
          required: true,
        },
        {
          fieldName: 'Email',
          fieldType: 'email',
          placeholder: 'votre@email.com',
          required: true,
        },
        {
          fieldName: 'Message',
          fieldType: 'textarea',
          placeholder: 'Votre message...',
          required: true,
        },
      ],
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Envoyer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailTo',
      title: 'Email de destination',
      type: 'email',
      description: "L'email qui recevra les soumissions du formulaire",
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
