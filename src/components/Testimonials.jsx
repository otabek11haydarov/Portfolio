import React from 'react';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  return (
    <section className="section-padding pt-0">
      <div className="mb-5">
        <div className="text-gradient fw-bold text-uppercase mb-2" style={{letterSpacing: '1px'}}>TESTIMONIALS</div>
        <h2 className="display-6 fw-bold">What Clients Say</h2>
      </div>
      
      <div className="row g-4">
        {testimonials.map(testimonial => (
          <div className="col-md-4" key={testimonial.id}>
            <div className="card-glass testimonial-card h-100 card-glass-hover">
              <i className="bi bi-quote quote-icon d-block"></i>
              <p className="testimonial-text">"{testimonial.text}"</p>
              
              <div className="client-info mt-auto">
                <div className="client-avatar">
                  <i className="bi bi-person text-secondary-color fs-4"></i>
                </div>
                <div>
                  <h5>{testimonial.name}</h5>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
