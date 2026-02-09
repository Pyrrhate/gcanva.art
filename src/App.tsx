import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Gallery from './components/Gallery';
import Manifesto from './components/Manifesto';
import Hero from './components/Hero';
import AreYouHuman from './components/AreYouHuman';

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
      <Gallery />
      <Manifesto />

      <footer id="contact" className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-8 tracking-wide">Get in Touch</h2>
          <p className="text-gray-400 mb-8 tracking-wide">
            For commissions and collaborations
          </p>
          <a
            href="mailto:hello@auroraart.com"
            className="inline-block text-lg tracking-wider hover:text-gray-400 transition-colors"
          >
            hello@auroraart.com
          </a>
        </div>
      </footer>

      <div className="py-6 text-center text-sm text-gray-500 tracking-wider">
        © 2024 AURORA. All rights reserved.
      </div>
    </div>
  );
}

export default App;
