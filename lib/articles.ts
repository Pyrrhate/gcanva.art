export interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
  content: string
}

export const articles: Article[] = [
  {
    slug: "transmutation-des-interfaces",
    title: "Transmutation des Interfaces",
    excerpt: "Comment la matiere brute du code se transforme en experience sensorielle. Notes sur l'alchimie du front-end.",
    category: "PROCESSUS",
    date: "2026-02-15",
    readTime: "6 min",
    tags: ["UI/UX", "Design Systems", "Philosophie"],
    featured: true,
    content: `L'interface n'est pas un ecran. C'est un seuil — un passage entre l'intention de l'utilisateur et la reponse de la machine. Chaque pixel est une decision. Chaque transition, une negociation.

Dans mon laboratoire, je decompose les interfaces comme un alchimiste decompose la matiere. Les composants sont mes elements premiers. Les props, mes reactifs. Le state, cette substance volatile qui change d'etat au moindre stimulus.

> "L'or du developpeur n'est pas le code parfait, mais le moment ou l'utilisateur oublie qu'il utilise un outil."

J'ai passe des semaines a etudier les micro-interactions — ces animations de 200ms qui separent une interface morte d'une interface vivante. Le secret n'est pas dans la complexite, mais dans le timing.

Le rhythm d'un ease-out a 300ms. Le poids visuel d'une ombre qui apparait au scroll. La tension d'un bouton qui attend d'etre presse. Tout cela compose une partition invisible.

\`\`\`typescript
const alchimie = {
  matiere: "pixels",
  catalyseur: "intention",
  resultat: "experience"
}
\`\`\`

Ce que je cherche, c'est la Pierre Philosophale du front-end : cette formule qui transforme le plomb du HTML brut en or d'experience utilisateur. Elle n'existe pas encore. Mais la quete est le veritable produit.`,
  },
  {
    slug: "anatomie-dun-glitch",
    title: "Anatomie d'un Glitch",
    excerpt: "Le glitch n'est pas une erreur. C'est la machine qui revele sa vraie nature. Exploration d'une esthetique du dysfonctionnement.",
    category: "EXPLORATION",
    date: "2026-02-08",
    readTime: "4 min",
    tags: ["Glitch Art", "Esthetique", "Numerique"],
    content: `Le glitch est un aveu. Quand la machine decroche, quand les pixels se desalignent, quand le buffer overflow colore l'ecran de fragmentations inattendues — la machine nous montre ce qu'elle est vraiment.

Nous vivons dans l'illusion de la perfection numerique. Tout est propre, aligne, retina-ready. Mais sous la surface, c'est le chaos. Des millions d'operations par seconde, des bits qui voyagent a la vitesse de la lumiere, des erreurs corrigees avant meme qu'on les voie.

Le glitch, c'est quand cette correction echoue. Et c'est beau.

> "L'art du glitch est l'art de l'accident controle."

J'ai commence a collectionner mes erreurs. Chaque bug visuel, chaque artefact de rendu, chaque crash esthetiquement interessant. Mon dossier \`/fragments\` est devenu une galerie involontaire.`,
  },
  {
    slug: "le-noir-comme-materiau",
    title: "Le Noir comme Materiau",
    excerpt: "Reflexions sur l'utilisation du noir en design d'interface. Pas comme absence, mais comme presence active.",
    category: "REFLEXION",
    date: "2026-01-28",
    readTime: "5 min",
    tags: ["Dark Mode", "Design", "Minimalisme"],
    content: `Le noir n'est pas une absence de couleur. En design d'interface, c'est un materiau a part entiere — avec sa densite, sa texture, sa profondeur.

Quand je construis un dark mode, je ne me contente pas d'inverser les couleurs. Je repense l'architecture lumineuse de l'interface. Le fond noir devient un espace — une scene sur laquelle les elements viennent jouer.

Les noirs ne sont jamais les memes. #0a0a0a a une qualite differente de #111111. Le premier est un vide cosmique. Le second, un charbon qui garde la memoire du feu.

\`\`\`css
:root {
  --void: #0a0a0a;
  --charbon: #111111;
  --encre: #1a1a1a;
  --fumee: #2a2a2a;
}
\`\`\`

Chaque interface sombre est un exercice de contraste et de hierarchie. Sans la couleur comme bequille, on est force de maitriser l'espacement, la typographie, les poids visuels.`,
  },
  {
    slug: "fragments-de-code-poetique",
    title: "Fragments de Code Poetique",
    excerpt: "Quand le code devient poesie. Ou comment j'ai appris a lire la beaute dans les algorithmes.",
    category: "CARNET",
    date: "2026-01-20",
    readTime: "3 min",
    tags: ["Code", "Poesie", "Creative Coding"],
    content: `Il y a de la poesie dans un reduce bien ecrit. Dans un recursive qui se deplie comme un origami mathematique. Dans un destructuring qui revele la structure cachee d'un objet.

Le code est un langage. Pas seulement un langage de machine — un langage humain, avec ses metaphores, ses rythmes, ses silences.

\`\`\`javascript
const univers = points
  .filter(p => p.visible)
  .map(p => ({ ...p, lumiere: calculerLumiere(p) }))
  .reduce((galaxie, etoile) => {
    galaxie[etoile.constellation] ??= []
    galaxie[etoile.constellation].push(etoile)
    return galaxie
  }, {})
\`\`\`

> "Le meilleur code est celui qu'on lit comme une phrase."

Je collectionne les fragments de code elegant. Pas necessairement performant, pas necessairement optimise — elegant. Celui qui dit exactement ce qu'il fait, avec grace.`,
  },
  {
    slug: "laboratoire-de-typographie",
    title: "Laboratoire de Typographie",
    excerpt: "Notes de terrain sur l'experimentation typographique en milieu web. Contraintes, decouvertes, accidents heureux.",
    category: "EXPLORATION",
    date: "2026-01-12",
    readTime: "7 min",
    tags: ["Typographie", "Web Fonts", "Experimentations"],
    featured: true,
    content: `La typographie sur le web est un compromis permanent. Entre ce que le designer veut, ce que le navigateur peut, et ce que la connexion de l'utilisateur permet.

J'ai monte un laboratoire typographique — un espace ou je teste les limites. Variable fonts poussees a l'extreme. Animations de glyphes. Textes qui respirent avec le scroll.

Le web est le medium le plus contraignant pour la typographie, et paradoxalement le plus riche. Parce que le texte y est vivant — il reagit, il s'adapte, il mute.

Mes experimentations recentes : des titres en Instrument Serif qui se deforment au hover, des paragraphes en Space Grotesk dont le poids varie avec la scrollbar, des chiffres en IBM Plex Mono qui s'animent comme un compteur de station nucleaire.

> "Sur le web, chaque lettre est un programme."

Le prochain objectif : creer une typographie generative qui mute en fonction du contenu qu'elle affiche. Un meta-texte. Une ecriture qui se lit elle-meme.`,
  },
  {
    slug: "carnet-de-veille-janvier",
    title: "Veille : Signaux Faibles",
    excerpt: "Les signaux faibles de janvier. Ce qui bouge en marge, loin du bruit des tendances mainstream.",
    category: "VEILLE",
    date: "2026-01-05",
    readTime: "4 min",
    tags: ["Veille", "Tendances", "Underground"],
    content: `La veille technologique, telle qu'elle est pratiquee par la majorite, est un echo chamber. Les memes frameworks, les memes articles, les memes opinions recyclees.

Je prefere ecouter les signaux faibles. Ceux qui viennent des marges. Un repo GitHub avec 12 etoiles qui resout un probleme que personne n'a encore nomme. Un blog japonais qui explore une technique CSS inedite. Un artiste sur Are.na qui detourne un outil de prototypage.

Ce mois-ci, mes decouvertes :

- Une approche du layout basee sur les grilles modulaires musicales
- Un nouveau paradigme d'animation qui utilise les courbes de Bezier comme langage expressif
- Des experimentations en CSS Houdini qui transforment le navigateur en moteur graphique

> "L'innovation ne vient jamais du centre. Elle vient toujours des bords."

La veille underground demande de la patience et de la curiosite. Pas un flux RSS, mais un radar humain.`,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug)
}
