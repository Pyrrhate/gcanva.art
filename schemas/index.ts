// Import des blocs du Page Builder
import hero from './blocks/hero'
import textContent from './blocks/textContent'
import gallery from './blocks/gallery'
import contactForm from './blocks/contactForm'

// Import des documents
import page from './documents/page'
import siteSettings from './documents/siteSettings'
import homepage from './documents/homepage'

// Export de tous les schémas
export const schemaTypes = [
  // Documents
  page,
  siteSettings,
  homepage,
  
  // Blocs du Page Builder
  hero,
  textContent,
  gallery,
  contactForm,
]
