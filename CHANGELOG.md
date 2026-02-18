# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2026-02-13

### ✨ Ajouté

#### Schémas de Base
- **Document `page`** : Système de page builder avec SEO intégré
- **Document `siteSettings`** : Paramètres globaux en mode singleton
- **Bloc `hero`** : Hero section avec image, titre et CTA
- **Bloc `textContent`** : Bloc de contenu texte riche avec Portable Text
- **Bloc `gallery`** : Galerie d'images avec 3 dispositions (grille, carrousel, mosaïque)
- **Bloc `contactForm`** : Formulaire de contact personnalisable

#### Configuration
- Configuration Sanity v3 complète avec TypeScript
- Structure modulaire des schémas (blocks/ et documents/)
- Configuration singleton pour siteSettings
- Desk tool personnalisé avec structure organisée

#### Documentation
- README.md : Vue d'ensemble du projet
- DOCUMENTATION.md : Documentation technique complète
- QUICKSTART.md : Guide de démarrage rapide en 6 étapes
- CHANGELOG.md : Historique des versions

#### Exemples
- `PageBuilder.example.tsx` : Composant React complet avec types TypeScript
- `sanity.queries.ts` : 10 requêtes GROQ prêtes à l'emploi
- `sanityClient.ts` : Configuration du client Sanity
- `styles.example.css` : Styles CSS pour tous les composants

#### Fichiers de Configuration
- `.gitignore` : Fichiers à ignorer par Git
- `.env.example` : Template de variables d'environnement
- `package.json` : Configuration npm avec scripts
- `tsconfig.json` : Configuration TypeScript
- `sanity.config.ts` : Configuration Sanity Studio

### 🎯 Fonctionnalités

- ✅ Page Builder ultra-flexible et extensible
- ✅ SEO intégré (global + par page)
- ✅ Gestion des réseaux sociaux
- ✅ Support des images avec hotspot
- ✅ Validation des données
- ✅ Preview personnalisé pour chaque type
- ✅ TypeScript pour une meilleure DX
- ✅ Structure 100% modulaire

### 📝 Notes

- Première version stable du template
- Compatible Sanity v3
- Prêt pour la production
- Testé avec Next.js 14

---

## Format

Les types de changements utilisés :
- `✨ Ajouté` : pour les nouvelles fonctionnalités
- `🔄 Modifié` : pour les changements dans les fonctionnalités existantes
- `🗑️ Déprécié` : pour les fonctionnalités bientôt supprimées
- `❌ Supprimé` : pour les fonctionnalités supprimées
- `🐛 Corrigé` : pour les corrections de bugs
- `🔒 Sécurité` : en cas de vulnérabilités
