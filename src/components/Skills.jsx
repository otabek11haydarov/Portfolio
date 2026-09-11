import React from 'react';
import { skills } from '../data/skills';

const Skills = () => {
  return (
    <section id="skills" className="section-padding pt-0">
      <div className="mb-5 text-center">
        <div className="text-gradient fw-bold text-uppercase mb-2 d-inline-block" style={{ letterSpacing: '1.5px' }}>
          <i className="bi bi-stack me-2 pulse-dot"></i>Technical Arsenal
        </div>
        <h2 className="display-5 fw-extrabold text-white">Skills & Specialized Stack</h2>
        <p className="text-secondary-color mt-3 mx-auto" style={{ maxWidth: '600px' }}>
          A diverse toolkit combining software engineering principles with robust data analytics capabilities.
        </p>
      </div>

      <div className="row g-4">
        {skills.map((skillGroup, index) => (
          <div className="col-xl-6" key={index}>
            <div className="card-glass p-4 p-lg-5 rounded-4 h-100 premium-skill-card hover-lift">
              <div className="d-flex align-items-center gap-4 mb-4">
                <div className="category-icon-box bg-glass border-subtle d-flex align-items-center justify-content-center rounded-circle flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                  <i className={`bi ${skillGroup.icon} text-gradient fs-3`}></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold text-white mb-1" style={{ letterSpacing: '0.5px' }}>{skillGroup.category}</h3>
                  <span className="small text-secondary-color text-uppercase fw-semibold" style={{ letterSpacing: '1px' }}>Core Competencies</span>
                </div>
              </div>

              <div className="row g-3 mt-2">
                {skillGroup.items.map((skill, idx) => {
                  let badgeClass = "badge-advanced";
                  if (skill.level === "Intermediate") badgeClass = "badge-intermediate";
                  if (skill.level === "Proficient") badgeClass = "badge-proficient";
                  
                  return (
                    <div className="col-md-6" key={idx}>
                      <div className="skill-item-premium d-flex align-items-center p-3 rounded-4 bg-glass border border-white border-opacity-10 h-100">
                        <i className={`bi ${skill.icon} fs-5 me-3 skill-icon`}></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold text-white mb-1" style={{ fontSize: '0.9rem' }}>{skill.name}</div>
                          <span className={`custom-level-badge ${badgeClass}`}>{skill.level}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

