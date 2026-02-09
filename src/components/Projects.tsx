import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects } from '../data/projects';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  year: number;
  link?: string;
}

interface ProjectsProps {
  projectList?: Project[];
}

const Projects = ({ projectList = projects }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  return (
    <div id="work" className="py-20 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-16 tracking-wide">WORK</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              className="group cursor-pointer"
            >
              {/* Project thumbnail */}
              <div className="relative overflow-hidden mb-4 aspect-square bg-gray-900">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white tracking-wider">VIEW</span>
                </div>
              </div>

              {/* Project info */}
              <h3 className="text-xl font-light tracking-wider mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{project.category}</p>
              <p className="text-xs text-gray-500">{project.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            {/* Image container */}
            <div className="relative aspect-video bg-gray-900 mb-6">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation arrows */}
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-400 transition-colors"
                  >
                    <ChevronLeft size={48} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-400 transition-colors"
                  >
                    <ChevronRight size={48} />
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded text-sm text-gray-300">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Project details */}
            <div className="bg-gray-900/50 p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-light tracking-wider mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {selectedProject.category} • {selectedProject.year}
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">{selectedProject.description}</p>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm tracking-wider hover:text-gray-400 transition-colors"
                >
                  VIEW PROJECT →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
