# 📚 INTÉGRATION SANITY.IO - CMS pour vos Projets

## 🎯 Pourquoi Sanity.io

**Pour VOUS :**
- Gérez le contenu facilement sans toucher le code
- Interface moderne et intuitive

**Pour VOS CLIENTS :**
- Ils peuvent modifier textes, images, projets
- Sans vous appeler à chaque fois !
- Interface simple en français possible

---

## 🚀 Étape 1 : Créer un Compte Sanity

1. Allez sur [sanity.io](https://www.sanity.io)
2. Cliquez **"Get started"**
3. Connectez-vous avec GitHub (recommandé)
4. Plan **gratuit** suffit pour commencer

---

## 📦 Étape 2 : Installation dans votre Projet

```bash
cd c:\laragon\www\gcanva.art\posts\gcanva.art

# Installer Sanity CLI
npm install -g @sanity/cli

# Créer un projet Sanity
sanity init

# Répondez aux questions :
# - Project name: gcanva-art
# - Use default dataset: Yes
# - Path: ./sanity (créera un dossier sanity/)
# - Template: Clean project
```

---

## 🏗️ Étape 3 : Configurer le Schéma des Projets

Créez `sanity/schemas/project.js` :

```javascript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Digital Art', value: 'digital-art' },
          { title: 'Photography', value: 'photography' },
          { title: 'Video Art', value: 'video-art' },
          { title: 'Mixed Media', value: 'mixed-media' }
        ]
      }
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(2000).max(2030)
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      rows: 6
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            },
            {
              name: 'annotation',
              title: 'Annotation',
              type: 'text',
              rows: 3
            }
          ]
        }
      ]
    },
    {
      name: 'link',
      title: 'External Link',
      type: 'url'
    }
  ]
}
```

Puis dans `sanity/schemas/index.js` :
```javascript
import project from './project'

export const schemaTypes = [project]
```

---

## 🎨 Étape 4 : Lancer le Studio Sanity

```bash
cd sanity
npm install
sanity start
```

Le studio s'ouvre à : `http://localhost:3333`

Vous pouvez maintenant ajouter vos projets visuellement ! 🎉

---

## 🔌 Étape 5 : Connecter React à Sanity

Installez le client Sanity dans votre projet React :

```bash
cd c:\laragon\www\gcanva.art\posts\gcanva.art
npm install @sanity/client @sanity/image-url
```

Créez `src/lib/sanity.ts` :

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'VOTRE_PROJECT_ID', // Trouvez ça dans sanity.json
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

---

## 📊 Étape 6 : Récupérer les Données

Modifiez `src/data/projects.ts` :

```typescript
import { client } from '../lib/sanity'
import { Project } from '../types'

export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    category,
    year,
    description,
    fullDescription,
    images[] {
      "url": image.asset->url,
      caption,
      annotation
    },
    link
  }`
  
  return await client.fetch(query)
}
```

Puis dans votre composant :

```tsx
import { useEffect, useState } from 'react'
import { getProjects } from '../data/projects'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>
  
  // ... reste du composant
}
```

---

## 🌐 Étape 7 : Déployer le Studio

```bash
cd sanity
sanity deploy
```

Choisissez un nom pour votre studio : `gcanva-studio`

Votre CMS sera accessible à : `gcanva-studio.sanity.studio`

---

## 🎯 Configuration CORS

Dans le dashboard Sanity :
1. Allez sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez votre projet
3. **Settings** → **API**
4. **CORS Origins** → **Add CORS origin**
5. Ajoutez :
   - `http://localhost:5173` (dev local)
   - `https://gcanva-art.pages.dev` (production)
   - `https://gcanva.art` (si domaine custom)

---

## 💰 Plan Gratuit Sanity

- ✅ 3 utilisateurs
- ✅ 2 datasets
- ✅ 10 GB bandwidth/mois
- ✅ 5 GB assets storage
- ✅ Parfait pour commencer !

---

## ✨ Avantages pour vos Clients

Avec Sanity, vos clients peuvent :
- ✏️ Modifier les textes
- 🖼️ Changer les images
- ➕ Ajouter des projets
- 🗑️ Supprimer du contenu
- 🌐 Tout gérer depuis une interface web

**Sans jamais toucher au code !**

---

## 🎓 Prochaines Étapes

1. Lancer le studio : `sanity start`
2. Ajouter quelques projets de test
3. Modifier votre code React pour utiliser Sanity
4. Tester localement
5. Déployer le studio : `sanity deploy`
6. Push sur GitHub → Déploiement auto sur Cloudflare

---

## 🆘 Ressources

- [Docs Sanity](https://www.sanity.io/docs)
- [Sanity + React Guide](https://www.sanity.io/guides/sanity-nextjs-tailwindcss)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)

---

**Note :** On fera cette intégration après la migration Cloudflare ! 
Une chose à la fois. 😊
