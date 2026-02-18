import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'l3lfckoz',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production', // `false` pour les données en temps réel, `true` pour les performances
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Optionnel, pour les requêtes authentifiées
})
