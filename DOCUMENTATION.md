# Template Master Sanity.io - Page Builder

Template réutilisable pour sites vitrines et portfolios d'artistes avec un système de Page Builder ultra-flexible.

## 📁 Structure des Schémas

```
schemas/
├── index.ts                    # Export de tous les schémas
├── blocks/                     # Blocs réutilisables du Page Builder
│   ├── hero.ts                # Bloc Hero (titre, image, CTA)
│   ├── textContent.ts         # Bloc de contenu texte riche
│   ├── gallery.ts             # Bloc galerie d'images
│   └── contactForm.ts         # Bloc formulaire de contact
└── documents/                  # Documents principaux
    ├── page.ts                # Document Page avec Page Builder
    └── siteSettings.ts        # Paramètres globaux (singleton)
```

## 🎯 Fonctionnalités

### Document `page` (Page)
- **Titre et Slug** : Gestion automatique des URLs
- **SEO intégré** : Meta titre, description, image OG par page
- **Page Builder** : Array de blocs modulaires pour construire vos pages

### Document `siteSettings` (Singleton)
- **Identité** : Logo, favicon, nom du site
- **SEO Global** : Meta tags par défaut pour tout le site
- **Réseaux Sociaux** : Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok
- **Contact** : Email, téléphone, adresse
- **Analytics** : Intégration Google Analytics

### Blocs du Page Builder

#### 🦸 Hero
- Titre et sous-titre
- Image avec hotspot
- Bouton d'action (CTA) avec lien

#### 📝 TextContent
- Titre optionnel
- Éditeur de texte riche (gras, italique, listes, liens)
- Alignement du contenu (gauche, centre, droite)

#### 🖼️ Gallery
- Titre optionnel
- Array d'images avec légendes
- 3 dispositions : Grille, Carrousel, Mosaïque
- Configuration du nombre de colonnes

#### 📨 ContactForm
- Titre et sous-titre
- Champs personnalisables (nom, email, téléphone, message)
- Configuration du bouton d'envoi
- Email de destination

## 🚀 Installation

1. **Installer les dépendances Sanity** :
```bash
npm install sanity @sanity/vision
```

2. **Configurer votre projet** :
   - Remplacez `YOUR_PROJECT_ID` dans `sanity.config.ts`
   - Configurez votre dataset

3. **Initialiser Sanity** :
```bash
npx sanity init
```

4. **Lancer le Studio** :
```bash
npx sanity dev
```

## 📋 Utilisation dans sanity.config.ts

Le fichier `sanity.config.ts` inclus montre comment :
- Importer les schémas depuis `./schemas`
- Configurer le singleton pour `siteSettings`
- Organiser la structure du desk tool
- Filtrer les actions pour les documents singleton

## ➕ Ajouter un nouveau bloc

Pour ajouter un nouveau bloc au Page Builder :

1. **Créer le fichier du bloc** dans `schemas/blocks/` :

```typescript
// schemas/blocks/monNouveauBloc.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'monNouveauBloc',
  title: 'Mon Nouveau Bloc',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // ... autres champs
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
```

2. **Importer dans `schemas/index.ts`** :

```typescript
import monNouveauBloc from './blocks/monNouveauBloc'

export const schemaTypes = [
  // ...
  monNouveauBloc,
]
```

3. **Ajouter au Page Builder dans `schemas/documents/page.ts`** :

```typescript
defineField({
  name: 'pageBuilder',
  type: 'array',
  of: [
    { type: 'hero' },
    { type: 'textContent' },
    { type: 'gallery' },
    { type: 'contactForm' },
    { type: 'monNouveauBloc' }, // ← Ajouter ici
  ],
})
```

## 🎨 Frontend - Exemple de Rendu

Exemple avec Next.js et Sanity Client :

```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Exemple de query
export async function getPage(slug: string) {
  return await client.fetch(`
    *[_type == "page" && slug.current == $slug][0] {
      title,
      seo,
      pageBuilder[] {
        _type,
        _type == "hero" => {
          title,
          subtitle,
          "imageUrl": image.asset->url,
          cta
        },
        _type == "textContent" => {
          title,
          body,
          alignment
        },
        _type == "gallery" => {
          title,
          layout,
          columns,
          images[] {
            "url": asset->url,
            alt,
            caption
          }
        },
        _type == "contactForm" => {
          title,
          subtitle,
          fields,
          submitButtonText,
          emailTo
        }
      }
    }
  `, { slug })
}
```

## 🔧 Technologies

- **Sanity v3** avec TypeScript
- **defineType & defineField** pour typage fort
- **Validation** intégrée pour la qualité des données
- **Preview** personnalisé pour une meilleure UX

## 📝 Notes Importantes

- `siteSettings` est configuré comme **singleton** (un seul document)
- Chaque bloc du Page Builder est un **object** (pas un document)
- Les images utilisent l'option **hotspot** pour un recadrage intelligent
- La structure est **100% modulaire** et extensible

## 🎓 Ressources

- [Documentation Sanity v3](https://www.sanity.io/docs)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

Créé avec ❤️ pour des projets web modernes et flexibles.
