import { useState } from 'react';
import { projects, Project } from '../data/projects';
import ProjectDetail from './ProjectDetail';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  // Si un projet est sélectionné, afficher la page de détail
  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div id="work" className="py-20 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light mb-16 tracking-wide">WORK</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              {/* Project thumbnail */}
              <div className="relative overflow-hidden mb-4 aspect-square bg-gray-900">
                <img
                  src={project.images[0].url}
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
    </div>
  );
};

export default Projects;
