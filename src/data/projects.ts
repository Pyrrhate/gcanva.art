// src/data/projects.ts
// Modifiez ce fichier avec vos vrais projets

export const projects = [
  {
    id: 'project-1',
    title: 'Dystopian Interfaces',
    category: 'Digital Art',
    year: 2024,
    description: 'A series exploring corrupted digital aesthetics and retro-futurism. Each piece investigates the intersection of nostalgia and anxiety in contemporary digital culture.',
    images: [
      '/images/project-1/image-1.jpg',
      '/images/project-1/image-2.jpg',
      '/images/project-1/image-3.jpg',
    ],
    link: 'https://example.com/project1',
  },
  {
    id: 'project-2',
    title: 'Urban Decay',
    category: 'Photography',
    year: 2024,
    description: 'Capturing the beauty in forgotten spaces. A documentary series about the aesthetics of abandonment and the passage of time.',
    images: [
      '/images/project-2/image-1.jpg',
      '/images/project-2/image-2.jpg',
      '/images/project-2/image-3.jpg',
      '/images/project-2/image-4.jpg',
    ],
    link: 'https://example.com/project2',
  },
  {
    id: 'project-3',
    title: 'Glitch Series',
    category: 'Video Art',
    year: 2023,
    description: 'Exploring digital artifacts and their poetic potential. These works celebrate the imperfections and errors of modern technology.',
    images: [
      '/images/project-3/image-1.jpg',
      '/images/project-3/image-2.jpg',
    ],
  },
  {
    id: 'project-4',
    title: 'Archive Studies',
    category: 'Mixed Media',
    year: 2023,
    description: 'A collection of experimental works investigating memory, documentation, and the archive as a site of artistic inquiry.',
    images: [
      '/images/project-4/image-1.jpg',
      '/images/project-4/image-2.jpg',
      '/images/project-4/image-3.jpg',
      '/images/project-4/image-4.jpg',
      '/images/project-4/image-5.jpg',
    ],
  },
];

/* 
  STRUCTURE DES IMAGES:
  =====================
  
  Créez cette structure dans votre dossier 'public/':
  
  public/
  └── images/
      ├── project-1/
      │   ├── image-1.jpg
      │   ├── image-2.jpg
      │   └── image-3.jpg
      ├── project-2/
      │   ├── image-1.jpg
      │   ├── image-2.jpg
      │   ├── image-3.jpg
      │   └── image-4.jpg
      ├── project-3/
      │   ├── image-1.jpg
      │   └── image-2.jpg
      └── project-4/
          ├── image-1.jpg
          ├── image-2.jpg
          ├── image-3.jpg
          ├── image-4.jpg
          └── image-5.jpg

  CHAMPS DISPONIBLES:
  ==================
  
  - id: identifiant unique (string, requis)
  - title: titre du projet (string, requis)
  - category: catégorie du projet (string, requis) 
  - year: année de création (number, requis)
  - description: description du projet (string, requis)
  - images: tableau des chemins d'images (string[], requis)
  - link: lien externe optionnel (string, optionnel)
  
  CONSEILS:
  =========
  
  ✓ Commencez avec 2-3 projets pour tester
  ✓ Gardez les chemins d'images cohérents
  ✓ Les images doivent supporter le zoom dans la modal
  ✓ Utilisez des formats web: JPG, PNG, WebP
  ✓ Optimisez les images (< 2MB chacune)
  ✓ Gardez un ratio d'aspect similaire pour une meilleure présentation
*/
