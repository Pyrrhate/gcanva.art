# 🚀 Guide de Démarrage Rapide

## Étape 1 : Installation

```bash
# Installer les dépendances
npm install

# Ou avec yarn
yarn install

# Ou avec pnpm
pnpm install
```

## Étape 2 : Configuration Sanity

1. **Créer un projet Sanity** (si pas déjà fait) :
```bash
npm create sanity@latest
```

2. **Récupérer votre Project ID** :
   - Visitez https://www.sanity.io/manage
   - Sélectionnez votre projet
   - Copiez le Project ID

3. **Mettre à jour `sanity.config.ts`** :
```typescript
export default defineConfig({
  projectId: 'VOTRE_PROJECT_ID_ICI', // ← Remplacez ici
  dataset: 'production',
  // ...
})
```

## Étape 3 : Lancer le Studio Sanity

```bash
# Lancer en mode développement
npm run dev

# Le studio sera accessible sur http://localhost:3333
```

## Étape 4 : Créer votre première page

1. Ouvrez le Studio Sanity dans votre navigateur
2. Allez dans **"Paramètres du Site"**
   - Remplissez les informations de base (nom, logo, SEO)
   - Configurez les réseaux sociaux

3. Créez une nouvelle **Page** :
   - Ajoutez un titre (ex: "Accueil")
   - Générez un slug
   - Utilisez le **Page Builder** pour ajouter des blocs :
     - Hero : Pour votre bannière principale
     - TextContent : Pour du contenu textuel
     - Gallery : Pour des images
     - ContactForm : Pour un formulaire de contact

4. **Publiez** votre page

## Étape 5 : Intégration Frontend

### Option A : Next.js (Recommandé)

1. **Installer le client Sanity** :
```bash
npm install @sanity/client @portabletext/react
```

2. **Créer le client** (`lib/sanity.ts`) :
```typescript
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'VOTRE_PROJECT_ID',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
```

3. **Créer une page dynamique** (`app/[slug]/page.tsx`) :
```typescript
import { client } from '@/lib/sanity'
import { PageBuilder } from '@/components/PageBuilder'

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await client.fetch(`
    *[_type == "page" && slug.current == $slug][0] {
      title,
      pageBuilder[] {
        _type,
        // ... vos projections
      }
    }
  `, { slug: params.slug })

  return <PageBuilder blocks={page.pageBuilder} />
}
```

4. **Utiliser les exemples fournis** :
   - Copiez `examples/PageBuilder.example.tsx` → `components/PageBuilder.tsx`
   - Copiez `examples/sanity.queries.ts` → `lib/queries.ts`
   - Adaptez selon vos besoins

### Option B : Autre Framework (React, Vue, etc.)

Les mêmes principes s'appliquent :
1. Installer `@sanity/client`
2. Créer une instance du client
3. Faire des requêtes GROQ
4. Rendre les composants selon le `_type`

## Étape 6 : Personnalisation

### Ajouter un nouveau bloc

Exemple : Créer un bloc "Témoignages"

1. **Créer le schéma** (`schemas/blocks/testimonials.ts`) :
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonials',
  title: 'Témoignages',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Témoignages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', title: 'Citation', type: 'text' },
          { name: 'author', title: 'Auteur', type: 'string' },
        ],
      }],
    }),
  ],
})
```

2. **Importer dans `schemas/index.ts`** :
```typescript
import testimonials from './blocks/testimonials'

export const schemaTypes = [
  // ...
  testimonials, // ← Ajouter
]
```

3. **Ajouter au Page Builder** (`schemas/documents/page.ts`) :
```typescript
pageBuilder: [
  { type: 'hero' },
  { type: 'textContent' },
  { type: 'gallery' },
  { type: 'contactForm' },
  { type: 'testimonials' }, // ← Ajouter
]
```

4. **Créer le composant frontend** :
```typescript
const TestimonialsComponent = ({ block }) => (
  <section>
    <h2>{block.title}</h2>
    {block.items.map((item, i) => (
      <blockquote key={i}>
        <p>{item.quote}</p>
        <cite>{item.author}</cite>
      </blockquote>
    ))}
  </section>
)
```

## 📚 Ressources

- **Documentation complète** : Voir `DOCUMENTATION.md`
- **Exemples de code** : Dossier `examples/`
- **Requêtes GROQ** : `examples/sanity.queries.ts`

## 🆘 Besoin d'aide ?

- [Documentation Sanity](https://www.sanity.io/docs)
- [Sanity Slack Community](https://slack.sanity.io/)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)

---

✨ Vous êtes prêt ! Commencez à construire votre site.
