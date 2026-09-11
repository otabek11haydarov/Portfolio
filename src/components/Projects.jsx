import React, { useState } from 'react';
import { projects } from '../data/projects';

const Projects = ({ activeFilter, setActiveFilter }) => {
  const [localCategory, setLocalCategory] = useState('All');

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'software') return project.type === 'fullstack';
    if (activeFilter === 'analytics') return project.type === 'analytics';
    
    if (localCategory === 'Software Engineering') return project.type === 'fullstack';
    if (localCategory === 'Data Analytics & ML') return project.type === 'analytics';
    return true;
  });

  return (
    <section id="portfolio" className="section-padding pt-0">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <div className="text-gradient fw-bold text-uppercase mb-1" style={{ letterSpacing: '1.5px' }}>
            <i className="bi bi-layers-half me-2"></i>PORTFOLIO SHOWCASE
          </div>
          <h2 className="display-6 fw-bold text-white mb-0">Featured Engineering & Analytics Projects</h2>
        </div>

        {/* Filter Tabs */}
        <div className="btn-group p-1 card-glass rounded-pill">
          {['All', 'Software Engineering', 'Data Analytics & ML'].map(cat => (
            <button
              key={cat}
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${localCategory === cat && activeFilter === 'all' ? 'btn-gradient' : 'text-secondary-color'}`}
              onClick={() => {
                setLocalCategory(cat);
                if (setActiveFilter) setActiveFilter('all');
              }}
            >
              {cat === 'All' ? '⚡ All Projects' : cat === 'Software Engineering' ? '💻 Software Apps' : '📊 Data & ML'}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {filteredProjects.map(project => (
          <div className="col-md-6 col-lg-6" key={project.id}>
            <div className="card-glass project-card card-glass-hover rounded-4 h-100 position-relative overflow-hidden">
              <div
                className="project-img-container p-4 d-flex flex-column justify-content-between text-white"
                style={{ background: project.gradient, minHeight: '180px' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-dark bg-opacity-50 backdrop-blur border border-white border-opacity-25 px-3 py-2 rounded-pill text-white font-monospace">
                    <i className={`bi ${project.icon} me-1`}></i> {project.category}
                  </span>
                  <div className="p-2 rounded-circle bg-white bg-opacity-25 text-white">
                    <i className="bi bi-arrow-up-right fs-5"></i>
                  </div>
                </div>

                <div>
                  <h3 className="h4 fw-bold text-white mb-1">{project.title}</h3>
                </div>
              </div>

              <div className="project-content p-4 d-flex flex-column flex-grow-1">
                <p className="text-secondary-color mb-3 small flex-grow-1" style={{ lineHeight: '1.6' }}>
                  {project.description}
                </p>

                {/* Metrics Badges */}
                {project.metrics && (
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    {project.metrics.map((metric, idx) => (
                      <span key={idx} className="badge bg-purple-subtle text-gradient border border-purple-subtle small px-2 py-1">
                        ⚡ {metric}
                      </span>
                    ))}
                  </div>
                )}

                <div className="tech-stack mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="badge bg-dark border border-secondary border-opacity-25 text-secondary px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="d-flex gap-2 mt-auto pt-3 border-top border-subtle">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-glass btn-sm w-100 d-flex justify-content-center align-items-center gap-2"
                  >
                    <i className="bi bi-github"></i> Repository
                  </a>
                  <a
                    href={project.demo}
                    className="btn btn-gradient btn-sm w-100 d-flex justify-content-center align-items-center gap-2"
                  >
                    <i className="bi bi-eye"></i> Details / Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

