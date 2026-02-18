import CreativeFeed, { CreativeFeedItem } from "@/components/CreativeFeed";

// ===== MOCK DATA for development =====
const mockFeedItems: CreativeFeedItem[] = [
  {
    id: "text-001",
    type: "text",
    data: {
      title: "Alchimie Ondulatoire",
      content: "Les ondes sont le langage du cosmos. Chaque vibration porte une intention, une fréquence qui résonne à travers les dimensions. C'est en écoutant ces fréquences que je sculpe l'invisible.",
      author: "gcanva",
      timestamp: "18 Feb 2026"
    }
  },
  {
    id: "image-001",
    type: "image",
    data: {
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=450&fit=crop",
      alt: "Abstract waves and frequencies",
      title: "Onde Primordiale #1",
      caption: "Une capture des fréquences électromagnétiques",
      aspectRatio: 16 / 9
    }
  },
  {
    id: "music-001",
    type: "music",
    data: {
      title: "Frequency Dreams",
      artist: "gcanva",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      duration: "3:45",
      description: "Une exploration sonore des ondes underground, électronique organique mélangeant synthétiseurs modifiés et enregistrements de phénomènes naturels.",
      spotifyUrl: "https://spotify.com"
    }
  },
  {
    id: "text-002",
    type: "text",
    data: {
      title: "La Magie Électronique",
      content: "Entre science et sorcellerie, il y a un espace où les électrons dansent en symbiose avec l'intention. L'électronique est l'alchimie du XXIe siècle.",
      author: "gcanva",
      timestamp: "17 Feb 2026"
    }
  },
  {
    id: "image-002",
    type: "image",
    data: {
      src: "https://images.unsplash.com/photo-1459479557261-8a5e0a4e9c7d?w=800&h=600&fit=crop",
      alt: "Electronic circuit board",
      title: "Circuit Sacré",
      caption: "Photographie macro d'une carte mère lumineuse",
      aspectRatio: 4 / 3
    }
  },
  {
    id: "music-002",
    type: "music",
    data: {
      title: "Underground Signal",
      artist: "gcanva",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      duration: "5:12",
      description: "Électronique minimaliste avec couches de field recordings souterrain. Un hymne aux ondes invisibles qui nous entourent.",
      spotifyUrl: "https://spotify.com"
    }
  }
];

export default function Page() {
  return <CreativeFeed items={mockFeedItems} />;
}