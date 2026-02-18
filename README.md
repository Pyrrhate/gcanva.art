# 🎨 Template Master Sanity.io

> Template réutilisable ultra-flexible avec Page Builder pour sites vitrines et portfolios d'artistes

[![Sanity](https://img.shields.io/badge/Sanity-v3-F03E2F?logo=sanity)](https://www.sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Fonctionnalités

- 🧱 **Page Builder modulaire** avec 4 blocs pré-configurés
- 🎯 **SEO intégré** (global + par page)
- 🖼️ **Gestion des médias** avec hotspot
- 🔗 **Réseaux sociaux** configurables
- 📱 **Responsive** et moderne
- 🔧 **100% extensible** - ajoutez facilement de nouveaux blocs
- 📝 **TypeScript** pour une meilleure DX

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Configuration (voir QUICKSTART.md)
# Mettre à jour le projectId dans sanity.config.ts

# Lancer le Studio Sanity
npm run dev
```

📖 **Guide complet** : [QUICKSTART.md](QUICKSTART.md)

## 📦 Structure du Projet

```
base/
├── schemas/
│   ├── blocks/              # Blocs réutilisables
│   │   ├── hero.ts
│   │   ├── textContent.ts
│   │   ├── gallery.ts
│   │   └── contactForm.ts
│   ├── documents/           # Documents principaux
│   │   ├── page.ts          # Pages avec Page Builder
│   │   └── siteSettings.ts  # Paramètres globaux (singleton)
│   └── index.ts             # Export de tous les schémas
├── examples/                # Exemples d'intégration
│   ├── PageBuilder.example.tsx
│   ├── sanity.queries.ts
│   └── sanityClient.ts
├── sanity.config.ts         # Configuration Sanity
├── DOCUMENTATION.md         # Documentation complète
└── QUICKSTART.md           # Guide de démarrage
```

## 🧱 Blocs Disponibles

| Bloc | Description | Champs principaux |
|------|-------------|-------------------|
| **Hero** | Bannière avec CTA | titre, image, bouton |
| **TextContent** | Contenu texte riche | titre, corps (Portable Text) |
| **Gallery** | Galerie d'images | images, disposition, colonnes |
| **ContactForm** | Formulaire de contact | champs personnalisables |

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Démarrage rapide en 6 étapes
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Documentation complète
- **[examples/](examples/)** - Exemples de code et requêtes GROQ

## 🎯 Cas d'Usage

✅ Sites vitrines  
✅ Portfolios d'artistes  
✅ Blogs  
✅ Landing pages  
✅ Sites corporate  

## 🛠️ Technologies

- **Sanity v3** - Headless CMS
- **TypeScript** - Typage fort
- **GROQ** - Query language

## 📝 Ajouter un Bloc

```typescript
// 1. Créer schemas/blocks/monBloc.ts
export default defineType({
  name: 'monBloc',
  type: 'object',
  fields: [/* ... */]
})

// 2. Importer dans schemas/index.ts
import monBloc from './blocks/monBloc'
export const schemaTypes = [/* ... */, monBloc]

// 3. Ajouter au Page Builder
pageBuilder: [
  { type: 'hero' },
  { type: 'monBloc' }, // ← nouveau bloc
]
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une PR.

## 📄 Licence

MIT © 2026

## 🔗 Liens Utiles

- [Documentation Sanity](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Sanity Community](https://slack.sanity.io/)

---

Créé avec ❤️ pour des projets web modernes et flexibles
