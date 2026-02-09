function Manifesto() {
  return (
    <section id="manifesto" className="py-32 px-6 bg-[#0f0f0f]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-center tracking-wide">
          Manifesto
        </h2>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-lg md:text-xl font-serif italic text-gray-200">
            "GCanva n'est pas qu'un portfolio, c'est un laboratoire ouvert."
          </p>

          <p className="text-base md:text-lg font-serif leading-loose">
            Je vois la création comme un processus de sédimentation. Sur gcanva.art, je compile les fragments de mon exploration visuelle et sonore. Ce site est mon carnet de bord digital, un espace où les idées ne sont pas seulement exposées, mais documentées dans leur évolution.
          </p>

          <p className="text-base md:text-lg font-serif leading-loose">
            Ma démarche : Entre le code et le pixel, je cherche la simplicité. Utilisant des outils comme Visual Studio Code pour sculpter l'architecture de mes projets et l'IA pour repousser les limites de l'imagination, je construis un pont entre l'art traditionnel et les technologies modernes.
          </p>

          <p className="text-base md:text-lg font-serif leading-loose">
             <ul>Ce que vous trouverez ici :
              <li>Postes & Réflexions : Des instantanés de mes recherches quotidiennes.</li>

              <li>Multimédia : Un mélange organique de sons, de vidéos et d'images.</li>

              <li>Expérimentations : Des projets nés de la curiosité, du test et parfois de l'erreur fertile.</li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Manifesto;
