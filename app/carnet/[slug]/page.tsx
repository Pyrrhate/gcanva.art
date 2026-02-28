"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { CarnetThemeProvider, useCarnetTheme } from "@/contexts/carnet-theme-context"
import { CarnetNavigation } from "@/components/carnet/navigation"
import { 
  ArticleContent, 
  ArticleDropCap, 
  ArticleBlockquote, 
  ArticleCodeBlock 
} from "@/components/carnet/article-content"
import { SAMPLE_ARTICLES } from "@/components/carnet/article-feed"
import { cn } from "@/lib/utils"

// Full article content for demonstration
const ARTICLE_CONTENT: Record<string, React.ReactNode> = {
  "transmutation-du-pixel": (
    <>
      <ArticleDropCap>
        Dans le laboratoire silencieux de l{"'"}écran, chaque pixel attend sa transformation. 
        Comme les alchimistes d{"'"}antan cherchaient à transmuter le plomb en or, nous, artisans 
        du numérique, transformons des bits en beauté, des algorithmes en émotions.
      </ArticleDropCap>

      <p>
        Le code n{"'"}est pas simplement un outil technique. C{"'"}est un médium artistique aussi 
        expressif que l{"'"}huile sur toile ou le marbre sous le ciseau. La différence réside 
        dans la nature même de notre matière première : elle est invisible, logique, mathématique.
      </p>

      <h2>La Matière Première Numérique</h2>

      <p>
        Considérons le pixel. Cette unité fondamentale de notre art n{"'"}existe pas vraiment. 
        C{"'"}est une abstraction, une convention. Pourtant, des millions de ces abstractions 
        assemblées créent des mondes entiers, des émotions profondes, des expériences inoubliables.
      </p>

      <ArticleBlockquote citation="Paul Klee">
        L{"'"}art ne reproduit pas le visible, il rend visible.
      </ArticleBlockquote>

      <p>
        Cette citation de Klee prend une dimension nouvelle dans le contexte numérique. 
        Notre code ne reproduit pas la réalité — il crée de nouvelles réalités. Chaque 
        fonction, chaque boucle, chaque condition est un coup de pinceau dans l{"'"}infini 
        du possible.
      </p>

      <h2>Le Processus Alchimique</h2>

      <p>
        La transmutation numérique suit des étapes précises, presque rituelles. D{"'"}abord, 
        l{"'"}intention : que voulons-nous créer? Ensuite, la conception : comment structurer 
        notre pensée en logique? Puis, l{"'"}implémentation : le moment où le code prend vie.
      </p>

      <ArticleCodeBlock 
        language="javascript"
        code={`// La formule de base de toute transmutation
function transmute(input, intention) {
  const essence = extract(input);
  const transformed = apply(essence, intention);
  return crystallize(transformed);
}

// L'art réside dans les détails
// de chaque fonction appelée`}
      />

      <p>
        Ce code simple contient toute la philosophie de notre pratique. L{"'"}extraction de 
        l{"'"}essence, l{"'"}application de l{"'"}intention, la cristallisation du résultat. 
        Trois étapes, infinies variations.
      </p>

      <h2>Au-delà de l{"'"}Outil</h2>

      <p>
        Les outils évoluent constamment. Les frameworks naissent et meurent. Les langages 
        se succèdent. Mais les principes fondamentaux de la création numérique restent 
        immuables : clarté d{"'"}intention, élégance de structure, attention au détail.
      </p>

      <p>
        L{"'"}alchimiste moderne ne cherche pas l{"'"}or physique. Il cherche quelque chose 
        de plus précieux encore : la résonance. Cette connexion invisible entre une création 
        et celui qui l{"'"}expérimente. Quand un utilisateur ressent quelque chose face à 
        notre travail — étonnement, joie, compréhension — la transmutation est accomplie.
      </p>

      <ArticleBlockquote>
        Le code le plus élégant est celui qui disparaît. Reste seulement l{"'"}expérience.
      </ArticleBlockquote>

      <p>
        C{"'"}est peut-être là le paradoxe ultime de notre art : nous créons des systèmes 
        complexes dont la plus haute expression est de sembler simples, naturels, évidents. 
        L{"'"}art véritable efface ses propres traces.
      </p>
    </>
  ),
  "glitch-comme-medium": (
    <>
      <ArticleDropCap>
        L{"'"}erreur est humaine. Mais dans le monde numérique, l{"'"}erreur peut devenir 
        transcendante. Le glitch, cette perturbation inattendue dans le flux parfait des 
        données, révèle la vérité cachée sous la surface lisse de nos interfaces.
      </ArticleDropCap>

      <p>
        Nous vivons dans une illusion de perfection numérique. Nos écrans sont polis, 
        nos animations fluides, nos interfaces prévisibles. Mais sous cette surface, 
        le chaos bouillonne. Le glitch est la fissure par laquelle ce chaos s{"'"}échappe.
      </p>

      <h2>Éloge de l{"'"}Imperfection</h2>

      <p>
        Les Japonais ont un concept pour cela : wabi-sabi, la beauté de l{"'"}imperfection. 
        Dans le numérique, le glitch incarne ce principe. Il rappelle que derrière chaque 
        pixel parfait se cachent des milliards d{"'"}opérations susceptibles de défaillir.
      </p>

      <ArticleBlockquote citation="Rosa Menkman, Glitch Studies Manifesto">
        Le glitch est une magnifique opportunité de voir ce qui se cache derrière la 
        façade polie de notre technologie.
      </ArticleBlockquote>

      <p>
        Quand un fichier image se corrompt, les données brutes deviennent visibles. Les 
        structures de compression se révèlent. Ce qui était invisible — le format, 
        l{"'"}encodage, l{"'"}algorithme — devient soudain tangible, presque sculptural.
      </p>

      <h2>Le Chaos Contrôlé</h2>

      <p>
        L{"'"}artiste du glitch ne se contente pas d{"'"}attendre l{"'"}accident. Il le 
        provoque, le cultive, le dirige. C{"'"}est un équilibriste marchant sur la ligne 
        fine entre ordre et désordre.
      </p>

      <ArticleCodeBlock 
        language="javascript"
        code={`// Corruption intentionnelle
function glitchify(imageData) {
  const chaos = Math.random() * 0.3;
  return imageData.map((byte, i) => 
    Math.random() < chaos 
      ? byte ^ (Math.random() * 255)
      : byte
  );
}`}
      />

      <p>
        Ce code est un acte de foi. Nous injectons le hasard dans la structure, puis 
        nous observons ce qui émerge. Parfois, c{"'"}est du bruit pur. Parfois, c{"'"}est 
        quelque chose de sublime.
      </p>
    </>
  ),
}

// Default content for articles without specific content
const DEFAULT_CONTENT = (
  <>
    <ArticleDropCap>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris.
    </ArticleDropCap>

    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <h2>Section Title</h2>

    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
      veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </p>

    <ArticleBlockquote>
      Content coming soon. This is a placeholder for the full article.
    </ArticleBlockquote>
  </>
)

function ArticlePageContent({ slug }: { slug: string }) {
  const { theme, showBlueprint } = useCarnetTheme()
  
  const article = SAMPLE_ARTICLES.find(a => a.slug === slug)
  
  if (!article) {
    notFound()
  }

  const content = ARTICLE_CONTENT[slug] || DEFAULT_CONTENT

  return (
    <main className={cn(
      "min-h-screen theme-transition",
      theme === "papier" && "paper-texture",
      theme === "vectrex" && "scanlines",
      showBlueprint && "blueprint-grid"
    )}>
      <CarnetNavigation />
      
      <ArticleContent
        title={article.title}
        category={article.category}
        date={article.date}
        readTime={article.readTime}
      >
        {content}
      </ArticleContent>
    </main>
  )
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  
  return (
    <CarnetThemeProvider>
      <ArticlePageContent slug={slug} />
    </CarnetThemeProvider>
  )
}
