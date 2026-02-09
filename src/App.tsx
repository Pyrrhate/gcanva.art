import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Manifesto from './components/Manifesto';
import Hero from './components/Hero';
import AreYouHuman from './components/AreYouHuman';
import Projects from './components/Projects';

type PageType = 'home' | 'areyouhuman';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Simple page routing
  if (currentPage === 'areyouhuman') {
    return (
      <div>
        <button
          onClick={() => setCurrentPage('home')}
          className="fixed top-6 left-6 z-50 px-4 py-2 text-sm font-mono tracking-wider border-2 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-gray-100 transition-colors"
        >
          ← RETOUR
        </button>
        <AreYouHuman />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-widest">AURORA</h1>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-8 text-sm tracking-wider">
            <button
              onClick={() => scrollToSection('work')}
              className="hover:text-gray-400 transition-colors"
            >
              WORK
            </button>
            <button
              onClick={() => scrollToSection('manifesto')}
              className="hover:text-gray-400 transition-colors"
            >
              MANIFESTO
            </button>
            <button
              onClick={() => setCurrentPage('areyouhuman')}
              className="hover:text-gray-400 transition-colors"
            >
              ARE YOU HUMAN
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-gray-400 transition-colors"
            >
              CONTACT
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-gray-800">
            <div className="flex flex-col gap-4 p-6 text-sm tracking-wider">
              <button
                onClick={() => scrollToSection('work')}
                className="text-left hover:text-gray-400 transition-colors"
              >
                WORK
              </button>
              <button
                onClick={() => scrollToSection('manifesto')}
                className="text-left hover:text-gray-400 transition-colors"
              >
                MANIFESTO
              </button>
              <button
                onClick={() => setCurrentPage('areyouhuman')}
                className="text-left hover:text-gray-400 transition-colors"
              >
                ARE YOU HUMAN
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left hover:text-gray-400 transition-colors"
              >
                CONTACT
              </button>
            </div>
          </div>
        )}
      </nav>

      <Hero />
      <Projects />
      <Manifesto />

      <footer id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide text-center">
            Collaborons sur le prochain calque.
          </h2>
          
          <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto text-center">
            Que ce soit pour une question technique, une proposition artistique ou simplement pour échanger sur une publication du carnet, je suis toujours ouvert au dialogue.
          </p>

          <div className="text-gray-400 space-y-4 mb-12 max-w-2xl mx-auto">
            <p className="text-center md:text-left">
              <span className="inline-block mr-3">📨</span>
              <strong>Email :</strong>{' '}
              <a
                href="mailto:guillaume.canva@gmail.com"
                className="hover:text-gray-200 transition-colors"
              >
                guillaume.canva@gmail.com
              </a>
            </p>
            
            <p className="text-center md:text-left">
              <span className="inline-block mr-3">💻</span>
              <strong>GitHub :</strong>{' '}
              <a
                href="https://github.com/Pyrrhate/gcanva.art"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors"
              >
                github.com/Pyrrhate/gcanva.art
              </a>
            </p>
            
            <p className="text-center md:text-left">
              <span className="inline-block mr-3">📍</span>
              <strong>Localisation :</strong> Doornik City (Tournai)
            </p>
          </div>

          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800">
            Ce site est propulsé par{' '}
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              Bolt.new
            </a>
            , déployé avec{' '}
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              Netlify
            </a>
            , et entretenu avec soin via{' '}
            <a
              href="https://code.visualstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              VS Code
            </a>
            .
          </div>
        </div>
      </footer>

      <div className="py-6 text-center text-sm text-gray-500">
        © 2026 gcanva.art
      </div>
    </div>
  );
}

export default App;
