// src/data/projects.ts
// Modifiez ce fichier avec vos vrais projets

export interface ImageWithAnnotation {
  url: string;
  caption: string;
  annotation?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  description: string;
  fullDescription?: string;
  images: ImageWithAnnotation[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Dystopian Interfaces',
    category: 'Digital Art',
    year: 2024,
    description: 'A series exploring corrupted digital aesthetics and retro-futurism.',
    fullDescription: 'A comprehensive series exploring corrupted digital aesthetics and retro-futurism. Each piece investigates the intersection of nostalgia and anxiety in contemporary digital culture. Through glitched screens and deteriorated video signals, we examine our relationship with technology and the inevitable decay of digital utopias.',
    images: [
      {
        url: '/images/project-1/image-1.jpg',
        caption: 'Interface #1',
        annotation: 'Opening piece of the series, establishing the visual language of digital decay.',
      },
      {
        url: '/images/project-1/image-2.jpg',
        caption: 'Interface #2',
        annotation: 'Exploration of nested systems and layers of information overload.',
      },
      {
        url: '/images/project-1/image-3.jpg',
        caption: 'Interface #3',
        annotation: 'Final composition merging all visual elements into a cohesive narrative.',
      },
    ],
    link: 'https://example.com/project1',
  },
  {
    id: 'project-2',
    title: 'Urban Decay',
    category: 'Photography',
    year: 2024,
    description: 'Capturing the beauty in forgotten spaces.',
    fullDescription: 'A documentary series about the aesthetics of abandonment and the passage of time. Urban Decay investigates forgotten architectural spaces, examining how nature reclaims the built environment and creates new patterns of beauty through deterioration.',
    images: [
      {
        url: '/images/project-2/image-1.jpg',
        caption: 'Abandoned Factory',
        annotation: 'Industrial remnants collected dust for over a decade before documentation.',
      },
      {
        url: '/images/project-2/image-2.jpg',
        caption: 'Fractured Facade',
        annotation: 'The geometric patterns of decay create unexpected compositional elements.',
      },
      {
        url: '/images/project-2/image-3.jpg',
        caption: 'Nature\'s Reclamation',
        annotation: 'Vegetation slowly reclaims the concrete landscape.',
      },
      {
        url: '/images/project-2/image-4.jpg',
        caption: 'Sunset Through Rust',
        annotation: 'Golden hour light filtering through oxidized metal structures.',
      },
    ],
    link: 'https://example.com/project2',
  },
  {
    id: 'project-3',
    title: 'Glitch Series',
    category: 'Video Art',
    year: 2023,
    description: 'Exploring digital artifacts and their poetic potential.',
    fullDescription: 'Exploring digital artifacts and their poetic potential. These works celebrate the imperfections and errors of modern technology, transforming technical failures into aesthetic experiences.',
    images: [
      {
        url: '/images/project-3/image-1.jpg',
        caption: 'Glitch #1',
        annotation: 'Digital compression errors become visual poetry.',
      },
      {
        url: '/images/project-3/image-2.jpg',
        caption: 'Glitch #2',
        annotation: 'Artifacts of signal loss and data corruption at magnified scale.',
      },
    ],
  },
  {
    id: 'project-4',
    title: 'Archive Studies',
    category: 'Mixed Media',
    year: 2023,
    description: 'Investigating memory, documentation, and the archive.',
    fullDescription: 'A collection of experimental works investigating memory, documentation, and the archive as a site of artistic inquiry. These pieces examine how we preserve, organize, and understand historical information.',
    images: [
      {
        url: '/images/project-4/image-1.jpg',
        caption: 'Archive Fragment #1',
        annotation: 'Layered documents hint at hidden narratives.',
      },
      {
        url: '/images/project-4/image-2.jpg',
        caption: 'Archive Fragment #2',
        annotation: 'Organized chaos of catalogued information.',
      },
      {
        url: '/images/project-4/image-3.jpg',
        caption: 'Archive Fragment #3',
        annotation: 'Time compressed into physical form.',
      },
      {
        url: '/images/project-4/image-4.jpg',
        caption: 'Archive Fragment #4',
        annotation: 'Deterioration as historical marker.',
      },
      {
        url: '/images/project-4/image-5.jpg',
        caption: 'Archive Fragment #5',
        annotation: 'Final meditative piece on the nature of preservation.',
      },
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
