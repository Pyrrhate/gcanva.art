import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Project } from '../data/projects';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail = ({ project, onBack }: ProjectDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const currentImage = project.images[currentImageIndex];

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 hover:text-gray-400 transition-colors text-sm tracking-wider"
          >
            ← BACK
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-light tracking-wider mb-4">
              {project.title}
            </h1>
            <div className="flex gap-8 text-sm text-gray-400 tracking-wider mb-8">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-4">
              {project.fullDescription || project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm tracking-wider hover:text-gray-400 transition-colors"
              >
                VIEW EXTERNAL LINK →
              </a>
            )}
          </div>

          {/* Gallery */}
          <div className="space-y-12">
            {project.images.map((image, index) => (
              <div
                key={index}
                className={`transition-opacity duration-300 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
                onClick={() => setCurrentImageIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image */}
                <div className="relative aspect-video bg-gray-900 mb-6 overflow-hidden border border-gray-800">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Caption and Annotation */}
                <div className="pl-2 md:pl-8">
                  <h2 className="text-2xl font-light tracking-wider mb-2">
                    {image.caption}
                  </h2>
                  {image.annotation && (
                    <p className="text-gray-400 leading-relaxed max-w-2xl">
                      {image.annotation}
                    </p>
                  )}

                  {/* Image counter */}
                  <div className="mt-4 text-xs text-gray-500 tracking-wider">
                    Image {index + 1} of {project.images.length}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Navigation */}
          {project.images.length > 1 && (
            <div className="mt-20 flex items-center justify-center gap-8 py-12 border-t border-gray-800">
              <button
                onClick={handlePrevImage}
                className="p-3 hover:bg-gray-800 transition-colors rounded-lg"
              >
                <ChevronLeft size={32} />
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-400 tracking-wider mb-2">
                  Viewing {currentImageIndex + 1} of {project.images.length}
                </div>
                <div className="flex gap-2 justify-center">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-gray-100 w-8'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextImage}
                className="p-3 hover:bg-gray-800 transition-colors rounded-lg"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
