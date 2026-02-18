# Guide de Contribution

Merci de votre intérêt pour contribuer à ce template Sanity.io ! 🎉

## 📋 Table des Matières

- [Comment Contribuer](#comment-contribuer)
- [Standards de Code](#standards-de-code)
- [Structure des Commits](#structure-des-commits)
- [Proposer un Nouveau Bloc](#proposer-un-nouveau-bloc)
- [Signaler un Bug](#signaler-un-bug)
- [Demander une Fonctionnalité](#demander-une-fonctionnalité)

## Comment Contribuer

1. **Fork** le projet
2. **Créer une branche** pour votre feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add: Amazing feature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir une Pull Request**

## Standards de Code

### TypeScript

- Utiliser `defineType` et `defineField` pour tous les schémas
- Toujours définir des validations appropriées
- Inclure des `preview` personnalisés pour une meilleure UX
- Commenter le code complexe

### Naming Conventions

```typescript
// ✅ Bon
name: 'hero'
name: 'textContent'
name: 'siteSettings'

// ❌ Éviter
name: 'Hero'
name: 'text_content'
name: 'site-settings'
```

### Structure des Fichiers

```typescript
// Template pour un nouveau bloc
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'nomDuBloc',
  title: 'Titre du Bloc',
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
    prepare({ title }) {
      return {
        title: title || 'Nom par défaut',
        subtitle: 'Description du bloc',
      }
    },
  },
})
```

## Structure des Commits

Utiliser des messages de commit clairs et descriptifs :

```
Type: Description courte

[Corps optionnel avec plus de détails]

[Footer optionnel]
```

### Types de Commits

- `Add:` Ajout d'une nouvelle fonctionnalité
- `Fix:` Correction d'un bug
- `Update:` Modification d'une fonctionnalité existante
- `Remove:` Suppression de code ou de fichiers
- `Docs:` Modification de la documentation
- `Style:` Changements de formatage (pas de changement de code)
- `Refactor:` Refactorisation du code
- `Test:` Ajout ou modification de tests
- `Chore:` Tâches de maintenance

### Exemples

```bash
Add: New testimonials block to page builder
Fix: Gallery layout issue on mobile devices
Update: Hero component with video support
Docs: Add French translation to README
```

## Proposer un Nouveau Bloc

Pour proposer un nouveau bloc au Page Builder :

### 1. Créer le Schéma

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
    // Ajouter tous les champs nécessaires
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Mon Nouveau Bloc',
        subtitle: 'Description du bloc',
      }
    },
  },
})
```

### 2. Créer le Composant Frontend

```typescript
// examples/components/MonNouveauBlocComponent.tsx
interface MonNouveauBlocProps {
  block: {
    _type: 'monNouveauBloc'
    title: string
    // ... autres props
  }
}

export const MonNouveauBlocComponent = ({ block }: MonNouveauBlocProps) => {
  return (
    <section className="mon-nouveau-bloc">
      <h2>{block.title}</h2>
      {/* ... reste du composant */}
    </section>
  )
}
```

### 3. Créer les Styles

```css
/* examples/styles/monNouveauBloc.css */
.mon-nouveau-bloc {
  /* Styles du bloc */
}
```

### 4. Documenter

Créer un fichier `schemas/blocks/README-monNouveauBloc.md` avec :

- Description du bloc
- Champs disponibles
- Cas d'usage
- Exemple de rendu
- Screenshots (optionnel)

### 5. Soumettre la PR

Inclure dans votre Pull Request :

- ✅ Le schéma TypeScript
- ✅ Le composant frontend exemple
- ✅ Les styles CSS
- ✅ La documentation
- ✅ Import dans `schemas/index.ts`
- ✅ Ajout dans `schemas/documents/page.ts`
- ✅ Mise à jour du CHANGELOG.md

## Signaler un Bug

Créer une **issue** avec :

1. **Titre clair** décrivant le problème
2. **Description** détaillée du bug
3. **Étapes pour reproduire** :
   ```
   1. Aller sur '...'
   2. Cliquer sur '...'
   3. Voir l'erreur
   ```
4. **Comportement attendu**
5. **Comportement actuel**
6. **Screenshots** (si applicable)
7. **Environnement** :
   - OS: [ex: Windows 11]
   - Navigateur: [ex: Chrome 120]
   - Version Sanity: [ex: 3.20.0]

## Demander une Fonctionnalité

Créer une **issue** avec le label `enhancement` :

1. **Titre** : Description courte de la fonctionnalité
2. **Problème résolu** : Quel problème cette fonctionnalité résout-elle ?
3. **Solution proposée** : Comment imaginez-vous cette fonctionnalité ?
4. **Alternatives** : Avez-vous considéré d'autres approches ?
5. **Contexte additionnel** : Screenshots, mockups, etc.

## Checklist Avant la PR

- [ ] Mon code suit le style du projet
- [ ] J'ai commenté mon code là où c'est nécessaire
- [ ] J'ai mis à jour la documentation
- [ ] Mes changements ne génèrent pas de nouveaux warnings
- [ ] J'ai ajouté les types TypeScript appropriés
- [ ] J'ai testé localement avec `npm run dev`
- [ ] J'ai mis à jour le CHANGELOG.md

## Questions ?

N'hésitez pas à ouvrir une issue avec le label `question` si vous avez besoin d'aide ou de clarifications.

## Code de Conduite

- 🤝 Soyez respectueux et inclusif
- 💬 Communiquez clairement
- 🎯 Restez concentré sur le sujet
- 🌟 Célébrez les contributions des autres

---

Merci pour votre contribution ! 🙏
