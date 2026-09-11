import React from 'react';

const Statistics = () => {
  return (
    <section className="section-padding pt-0">
      <div className="stats-banner card-glass border-subtle position-relative overflow-hidden p-4 p-md-5 rounded-4">
        <div className="row g-4 justify-content-center align-items-center">
          <div className="col-6 col-lg-3">
            <div className="stat-item text-center">
              <div className="display-5 fw-extrabold text-white mb-1">5+</div>
              <div className="text-secondary-color small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>
                <i className="bi bi-rocket-takeoff text-purple me-1"></i> Core Systems Shipped
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="stat-item text-center">
              <div className="display-5 fw-extrabold text-gradient mb-1">94.2%</div>
              <div className="text-secondary-color small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>
                <i className="bi bi-cpu text-info me-1"></i> ML Accuracy Rate
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="stat-item text-center">
              <div className="display-5 fw-extrabold text-white mb-1">15K+</div>
              <div className="text-secondary-color small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>
                <i className="bi bi-database text-warning me-1"></i> SQL Rows Processed
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="stat-item text-center">
              <div className="display-5 fw-extrabold text-gradient mb-1">100%</div>
              <div className="text-secondary-color small fw-semibold text-uppercase" style={{ letterSpacing: '1px' }}>
                <i className="bi bi-check-circle text-success me-1"></i> Code & Data Integrity
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;

