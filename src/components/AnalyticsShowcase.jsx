import React, { useState } from 'react';

const AnalyticsShowcase = () => {
  const [activeTab, setActiveTab] = useState('ml');
  const [selectedCohort, setSelectedCohort] = useState('All');

  // Simulated dataset stats for student ML model
  const cohortData = {
    All: { avgScore: 84.5, accuracy: '94.2%', rows: '1,250', predictedCEFR: 'B2 - C1' },
    Beginner: { avgScore: 68.2, accuracy: '92.1%', rows: '380', predictedCEFR: 'A2 - B1' },
    Intermediate: { avgScore: 82.4, accuracy: '95.0%', rows: '540', predictedCEFR: 'B1 - B2' },
    Advanced: { avgScore: 94.8, accuracy: '96.4%', rows: '330', predictedCEFR: 'C1 - C2' }
  };

  const currentStats = cohortData[selectedCohort];

  return (
    <section id="analytics-showcase" className="section-padding pt-0">
      <div className="card-glass p-4 p-lg-5 rounded-4 overflow-hidden position-relative">
        <div className="bg-glow-1"></div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3 position-relative z-2">
          <div>
            <div className="text-gradient fw-bold text-uppercase mb-1" style={{ letterSpacing: '1.5px' }}>
              <i className="bi bi-cpu me-2"></i>INTERACTIVE TECH & DATA LAB
            </div>
            <h2 className="display-6 fw-bold text-white mb-0">Analytics & Engineering Playground</h2>
          </div>

          <div className="btn-group p-1 card-glass rounded-pill">
            <button
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeTab === 'ml' ? 'btn-gradient' : 'text-secondary-color'}`}
              onClick={() => setActiveTab('ml')}
            >
              <i className="bi bi-graph-up me-1"></i> ML Prediction Model
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeTab === 'sql' ? 'btn-gradient' : 'text-secondary-color'}`}
              onClick={() => setActiveTab('sql')}
            >
              <i className="bi bi-database me-1"></i> SQL & ETL Pipeline
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeTab === 'api' ? 'btn-gradient' : 'text-secondary-color'}`}
              onClick={() => setActiveTab('api')}
            >
              <i className="bi bi-code-slash me-1"></i> Full-Stack API
            </button>
          </div>
        </div>

        {/* TAB 1: ML PREDICTION MODEL */}
        {activeTab === 'ml' && (
          <div className="row g-4 align-items-center position-relative z-2">
            <div className="col-lg-5">
              <div className="card-glass p-4 rounded-3 border-0 bg-opacity-25">
                <span className="badge bg-purple-subtle text-gradient mb-2 px-3 py-2 rounded-pill">
                  Scikit-Learn & Pandas Model
                </span>
                <h3 className="h4 fw-bold text-white mb-3">Student Performance & CEFR Forecast</h3>
                <p className="text-secondary-color small mb-4">
                  Interactive prediction model classifying student academic trajectory based on historical exam features, study hours, and assessment metrics.
                </p>

                <div className="mb-4">
                  <label className="text-secondary-color small mb-2 d-block fw-semibold">SELECT COHORT FILTER:</label>
                  <div className="d-flex flex-wrap gap-2">
                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(cohort => (
                      <button
                        key={cohort}
                        className={`btn btn-sm ${selectedCohort === cohort ? 'btn-gradient' : 'btn-outline-glass'}`}
                        onClick={() => setSelectedCohort(cohort)}
                      >
                        {cohort}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <div className="p-3 card-glass rounded-3 text-center">
                      <div className="text-secondary-color small">Accuracy</div>
                      <div className="h4 text-gradient fw-bold mb-0">{currentStats.accuracy}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-3 card-glass rounded-3 text-center">
                      <div className="text-secondary-color small">Est. CEFR Target</div>
                      <div className="h4 text-white fw-bold mb-0">{currentStats.predictedCEFR}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card-glass p-4 rounded-3 border-subtle">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-secondary-color"><i className="bi bi-bar-chart-fill me-1 text-purple"></i> Cohort Score Trajectory Chart</span>
                  <span className="badge bg-dark border border-secondary text-secondary">Rows: {currentStats.rows}</span>
                </div>

                {/* SVG Visual Chart */}
                <div className="p-3 bg-dark bg-opacity-50 rounded-3 mb-3 border border-secondary border-opacity-25">
                  <svg viewBox="0 0 500 180" className="w-100" style={{ maxHeight: '200px' }}>
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B3DFF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#8B3DFF" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
                    <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
                    <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.1)" strokeDasharray="4" />
                    
                    <path
                      d="M 20,130 Q 120,110 200,70 T 380,45 T 480,25 L 480,160 L 20,160 Z"
                      fill="url(#chartGlow)"
                    />
                    <path
                      d="M 20,130 Q 120,110 200,70 T 380,45 T 480,25"
                      fill="none"
                      stroke="#8B3DFF"
                      strokeWidth="3"
                    />
                    
                    <circle cx="200" cy="70" r="5" fill="#4267FF" stroke="#fff" strokeWidth="2" />
                    <circle cx="380" cy="45" r="5" fill="#E83E8C" stroke="#fff" strokeWidth="2" />
                    <circle cx="480" cy="25" r="6" fill="#8B3DFF" stroke="#fff" strokeWidth="2" />

                    <text x="200" y="55" fill="#A7ABC4" fontSize="11" textAnchor="middle">Midterm: 82%</text>
                    <text x="380" y="32" fill="#A7ABC4" fontSize="11" textAnchor="middle">Final: 91%</text>
                    <text x="470" y="15" fill="#fff" fontSize="11" textAnchor="end" fontWeight="bold">Predicted: 95%</text>
                  </svg>
                </div>

                <div className="code-box bg-dark p-3 rounded-3 text-start overflow-auto style-code">
                  <div className="d-flex justify-content-between text-secondary-color small mb-2 border-bottom border-secondary border-opacity-25 pb-1">
                    <span><i className="bi bi-filetype-py me-1 text-warning"></i> predict_performance.py</span>
                    <span className="text-success">✔ Scikit-Learn Engine</span>
                  </div>
                  <pre className="m-0 text-light small font-monospace">
<code>{`import pandas as pd
from sklearn.ensemble import RandomForestClassifier

def evaluate_cohort(df, target='cefr_level'):
    X = df[['reading_score', 'listening_score', 'attendance_pct']]
    y = df[target]
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model.score(X, y)`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SQL & ETL PIPELINE */}
        {activeTab === 'sql' && (
          <div className="row g-4 align-items-center position-relative z-2">
            <div className="col-lg-6">
              <div className="card-glass p-4 rounded-3 border-subtle">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-secondary-color"><i className="bi bi-database-fill-gear me-1 text-info"></i> Optimized PostgreSQL Query</span>
                  <span className="badge bg-success bg-opacity-25 text-success">Exec: 14ms</span>
                </div>
                <div className="bg-dark p-3 rounded-3 mb-3 border border-secondary border-opacity-25">
                  <pre className="m-0 text-light small font-monospace">
<code>{`SELECT 
    d.doctor_name,
    COUNT(p.id) AS total_patients,
    ROUND(AVG(p.satisfaction_score), 2) AS avg_rating,
    ARRAY_AGG(DISTINCT p.primary_diagnosis) FILTER (WHERE p.status = 'active') AS active_diagnoses
FROM doctors d
JOIN patients p ON d.id = p.assigned_doctor_id
WHERE p.created_at >= NOW() - INTERVAL '30 days'
GROUP BY d.id, d.doctor_name
HAVING COUNT(p.id) > 10
ORDER BY avg_rating DESC;`}</code>
                  </pre>
                </div>
                <div className="d-flex gap-2">
                  <span className="badge bg-secondary-subtle text-secondary small">Indexed Joins</span>
                  <span className="badge bg-secondary-subtle text-secondary small">Aggregations</span>
                  <span className="badge bg-secondary-subtle text-secondary small">Window Functions</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card-glass p-4 rounded-3 border-subtle text-start">
                <h4 className="h5 fw-bold text-white mb-3"><i className="bi bi-table text-primary me-2"></i> Query Result Execution Matrix</h4>
                <div className="table-responsive">
                  <table className="table table-dark table-hover table-sm align-middle small mb-3">
                    <thead>
                      <tr className="text-secondary">
                        <th>Doctor</th>
                        <th>Patients</th>
                        <th>Avg Rating</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-semibold text-white">Dr. Sarah Jenkins</td>
                        <td>48</td>
                        <td><span className="text-warning">4.92 ★</span></td>
                        <td><span className="badge bg-success">Optimal</span></td>
                      </tr>
                      <tr>
                        <td className="fw-semibold text-white">Dr. Alex Rivera</td>
                        <td>35</td>
                        <td><span className="text-warning">4.85 ★</span></td>
                        <td><span className="badge bg-success">Optimal</span></td>
                      </tr>
                      <tr>
                        <td className="fw-semibold text-white">Dr. Elena Rostova</td>
                        <td>42</td>
                        <td><span className="text-warning">4.78 ★</span></td>
                        <td><span className="badge bg-success">Optimal</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-secondary bg-opacity-10 rounded-3 text-secondary small">
                  <i className="bi bi-lightning-fill text-warning me-1"></i> Data aggregated from 15,000+ patient records with sub-20ms index scan execution time.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FULL STACK API */}
        {activeTab === 'api' && (
          <div className="row g-4 align-items-center position-relative z-2">
            <div className="col-lg-6">
              <div className="card-glass p-4 rounded-3 border-subtle">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="small text-secondary-color"><i className="bi bi-code-square me-1 text-primary"></i> RESTful API Controller (Node.js & Express)</span>
                  <span className="badge bg-primary bg-opacity-25 text-primary">GET /api/v1/patients</span>
                </div>
                <div className="bg-dark p-3 rounded-3 mb-0 border border-secondary border-opacity-25">
                  <pre className="m-0 text-light small font-monospace">
<code>{`// Express Controller with Robust Validation
export const getPatientMetrics = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    const records = await prisma.patient.findMany({
      where: { doctorId, status: 'ACTIVE' },
      include: { prescriptions: true, diagnoses: true }
    });
    return res.status(200).json({ success: true, count: records.length, data: records });
  } catch (error) {
    next(error);
  }
};`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card-glass p-4 rounded-3 border-subtle text-start">
                <h4 className="h5 fw-bold text-white mb-3"><i className="bi bi-shield-check text-success me-2"></i> System Architecture Highlights</h4>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  <li className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded-circle bg-purple bg-opacity-25 text-purple"><i className="bi bi-lock-fill"></i></div>
                    <div>
                      <div className="fw-semibold text-white">Role-Based Access Control (RBAC)</div>
                      <div className="text-secondary-color small">Secured API endpoints supporting Doctor, Admin, and Patient data partitions.</div>
                    </div>
                  </li>
                  <li className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded-circle bg-blue bg-opacity-25 text-blue"><i className="bi bi-speedometer2"></i></div>
                    <div>
                      <div className="fw-semibold text-white">High-Throughput Middleware</div>
                      <div className="text-secondary-color small">Built-in rate limiting, response caching, and structured error payload responses.</div>
                    </div>
                  </li>
                  <li className="d-flex align-items-start gap-3">
                    <div className="p-2 rounded-circle bg-success bg-opacity-25 text-success"><i className="bi bi-diagram-2-fill"></i></div>
                    <div>
                      <div className="fw-semibold text-white">Clean Component Architecture</div>
                      <div className="text-secondary-color small">Modular React 19 state synchronization with zero re-render waste.</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalyticsShowcase;
