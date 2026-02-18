# 📂 Index des Fichiers du Projet

## 📁 Racine du Projet

| Fichier | Description |
|---------|-------------|
| [README.md](README.md) | Vue d'ensemble du projet et démarrage rapide |
| [QUICKSTART.md](QUICKSTART.md) | Guide de démarrage en 6 étapes |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Documentation technique complète |
| [CHANGELOG.md](CHANGELOG.md) | Historique des versions et modifications |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guide pour contribuer au projet |
| [LICENSE](LICENSE) | Licence MIT du projet |
| [package.json](package.json) | Dépendances et scripts npm |
| [tsconfig.json](tsconfig.json) | Configuration TypeScript |
| [sanity.config.ts](sanity.config.ts) | Configuration du Studio Sanity |
| [.env.example](.env.example) | Template des variables d'environnement |
| [.gitignore](.gitignore) | Fichiers ignorés par Git |

## 📁 schemas/ - Schémas Sanity

### Index Principal

| Fichier | Description |
|---------|-------------|
| [schemas/index.ts](schemas/index.ts) | Export de tous les schémas pour sanity.config.ts |

### 📁 schemas/blocks/ - Blocs du Page Builder

| Fichier | Description | Champs Principaux |
|---------|-------------|-------------------|
| [hero.ts](schemas/blocks/hero.ts) | Bloc Hero avec bannière | title, subtitle, image, cta |
| [textContent.ts](schemas/blocks/textContent.ts) | Bloc de contenu texte riche | title, body (Portable Text), alignment |
| [gallery.ts](schemas/blocks/gallery.ts) | Bloc galerie d'images | title, images[], layout, columns |
| [contactForm.ts](schemas/blocks/contactForm.ts) | Bloc formulaire de contact | title, fields[], submitButtonText |

### 📁 schemas/documents/ - Documents Principaux

| Fichier | Type | Description |
|---------|------|-------------|
| [page.ts](schemas/documents/page.ts) | Document | Page avec Page Builder et SEO |
| [siteSettings.ts](schemas/documents/siteSettings.ts) | Singleton | Paramètres globaux du site |

## 📁 examples/ - Exemples d'Intégration

| Fichier | Description |
|---------|-------------|
| [PageBuilder.example.tsx](examples/PageBuilder.example.tsx) | Composants React pour rendre le Page Builder |
| [sanity.queries.ts](examples/sanity.queries.ts) | 10 requêtes GROQ prêtes à l'emploi |
| [sanityClient.ts](examples/sanityClient.ts) | Configuration du client Sanity |
| [styles.example.css](examples/styles.example.css) | Styles CSS pour tous les composants |

---

## 🗺️ Arborescence Complète

```
base/
├── 📄 README.md                         # Vue d'ensemble
├── 📄 QUICKSTART.md                     # Guide démarrage rapide
├── 📄 DOCUMENTATION.md                  # Documentation complète
├── 📄 CHANGELOG.md                      # Historique des versions
├── 📄 CONTRIBUTING.md                   # Guide de contribution
├── 📄 LICENSE                           # Licence MIT
├── 📄 package.json                      # Configuration npm
├── 📄 tsconfig.json                     # Configuration TypeScript
├── 📄 sanity.config.ts                  # Configuration Sanity
├── 📄 .env.example                      # Variables d'environnement
├── 📄 .gitignore                        # Fichiers ignorés
│
├── 📁 schemas/                          # Schémas Sanity
│   ├── 📄 index.ts                      # Export central
│   │
│   ├── 📁 blocks/                       # Blocs réutilisables
│   │   ├── 📄 hero.ts                   # Bloc Hero
│   │   ├── 📄 textContent.ts            # Bloc Texte
│   │   ├── 📄 gallery.ts                # Bloc Galerie
│   │   └── 📄 contactForm.ts            # Bloc Formulaire
│   │
│   └── 📁 documents/                    # Documents principaux
│       ├── 📄 page.ts                   # Document Page
│       └── 📄 siteSettings.ts           # Singleton Settings
│
└── 📁 examples/                         # Exemples d'intégration
    ├── 📄 PageBuilder.example.tsx       # Composants React
    ├── 📄 sanity.queries.ts             # Requêtes GROQ
    ├── 📄 sanityClient.ts               # Client Sanity
    └── 📄 styles.example.css            # Styles CSS
```

---

## 🎯 Navigation Rapide

### Pour Commencer
1. Lisez le [README.md](README.md)
2. Suivez le [QUICKSTART.md](QUICKSTART.md)
3. Configurez [sanity.config.ts](sanity.config.ts)

### Pour Développer
1. Explorez [schemas/](schemas/)
2. Consultez [examples/](examples/)
3. Référez-vous à [DOCUMENTATION.md](DOCUMENTATION.md)

### Pour Contribuer
1. Lisez [CONTRIBUTING.md](CONTRIBUTING.md)
2. Vérifiez [CHANGELOG.md](CHANGELOG.md)
3. Respectez la [LICENSE](LICENSE)

---

## 📊 Statistiques

- **Total de schémas** : 6 (4 blocs + 2 documents)
- **Lignes de documentation** : ~1000+
- **Exemples de code** : 4 fichiers
- **Prêt à l'emploi** : ✅

---

Créé avec ❤️ pour faciliter votre développement
