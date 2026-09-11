import React from 'react';

const TrustedTechnologies = () => {
  const techs = [
    "SQL", "Python", "Power BI", "Excel", "Pandas", 
    "Scikit-learn", "React", "Node.js", "MySQL", "PostgreSQL"
  ];
  
  return (
    <section className="py-4">
      <div className="text-center mb-4">
        <span className="text-secondary small fw-bold tracking-widest text-uppercase" style={{letterSpacing: '2px'}}>Technologies I Work With</span>
      </div>
      
      <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4 align-items-center opacity-75">
        {techs.map((tech, index) => (
          <div key={index} className="px-3 py-2 card-glass text-white fs-6 fw-medium d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill" style={{color: 'var(--color-purple)'}}></i> {tech}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedTechnologies;
