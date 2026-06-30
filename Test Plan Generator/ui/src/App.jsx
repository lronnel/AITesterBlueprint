import React, { useMemo, useState } from 'react';

const initialCases = [
  { id: 'TC-001', module: 'Authentication', feature: 'Token Generation', requirement: 'REQ-01', preconditions: 'API is reachable', data: 'Valid admin credentials', steps: 'POST /auth with valid credentials', expected: '200 OK and token returned', priority: 'High', severity: 'High', status: 'Planned', type: 'Positive', automation: 'Yes', endpoint: '/auth', method: 'POST' },
  { id: 'TC-002', module: 'Authentication', feature: 'Invalid Credentials', requirement: 'REQ-02', preconditions: 'API is reachable', data: 'Wrong password', steps: 'POST /auth with invalid credentials', expected: '403 Forbidden', priority: 'High', severity: 'High', status: 'Planned', type: 'Negative', automation: 'Yes', endpoint: '/auth', method: 'POST' },
  { id: 'TC-003', module: 'Booking', feature: 'Create Booking', requirement: 'REQ-03', preconditions: 'Valid token', data: 'Full booking payload', steps: 'POST /booking with valid body', expected: '200 OK and booking ID created', priority: 'High', severity: 'High', status: 'Planned', type: 'Positive', automation: 'Yes', endpoint: '/booking', method: 'POST' },
  { id: 'TC-004', module: 'Booking', feature: 'Create Booking with Missing Fields', requirement: 'REQ-03', preconditions: 'Valid token', data: 'Incomplete payload', steps: 'POST /booking without mandatory data', expected: '400 Bad Request', priority: 'High', severity: 'Medium', status: 'Planned', type: 'Negative', automation: 'Yes', endpoint: '/booking', method: 'POST' },
  { id: 'TC-005', module: 'Booking', feature: 'Get Booking by ID', requirement: 'REQ-04', preconditions: 'Existing booking ID', data: 'Valid booking ID', steps: 'GET /booking/{id}', expected: '200 OK and booking details', priority: 'High', severity: 'High', status: 'Planned', type: 'Positive', automation: 'Yes', endpoint: '/booking/{id}', method: 'GET' },
  { id: 'TC-006', module: 'Booking', feature: 'Get Non-existent Booking', requirement: 'REQ-04', preconditions: 'API is reachable', data: 'Invalid booking ID', steps: 'GET /booking/999999', expected: '404 Not Found', priority: 'Medium', severity: 'Medium', status: 'Planned', type: 'Negative', automation: 'Yes', endpoint: '/booking/{id}', method: 'GET' },
  { id: 'TC-007', module: 'Booking', feature: 'Update Booking', requirement: 'REQ-05', preconditions: 'Existing booking and valid token', data: 'Updated booking payload', steps: 'PUT /booking/{id}', expected: '200 OK and updated booking returned', priority: 'High', severity: 'High', status: 'Planned', type: 'Positive', automation: 'Yes', endpoint: '/booking/{id}', method: 'PUT' },
  { id: 'TC-008', module: 'Booking', feature: 'Update Without Auth', requirement: 'REQ-05', preconditions: 'Existing booking ID', data: 'Updated payload without token', steps: 'PUT /booking/{id} without auth', expected: '403 Forbidden', priority: 'High', severity: 'High', status: 'Planned', type: 'Security', automation: 'Yes', endpoint: '/booking/{id}', method: 'PUT' },
  { id: 'TC-009', module: 'Booking', feature: 'Delete Booking', requirement: 'REQ-06', preconditions: 'Existing booking ID and auth', data: 'Valid booking ID', steps: 'DELETE /booking/{id}', expected: '201 Created and booking removed', priority: 'High', severity: 'High', status: 'Planned', type: 'Positive', automation: 'Yes', endpoint: '/booking/{id}', method: 'DELETE' },
  { id: 'TC-010', module: 'Booking', feature: 'Delete Booking Without Auth', requirement: 'REQ-06', preconditions: 'Existing booking ID', data: 'Valid booking ID', steps: 'DELETE /booking/{id} without token', expected: '403 Forbidden', priority: 'High', severity: 'High', status: 'Blocked', type: 'Security', automation: 'Yes', endpoint: '/booking/{id}', method: 'DELETE' },
  { id: 'TC-011', module: 'Performance', feature: 'Response Time', requirement: 'REQ-07', preconditions: 'Environment available', data: '10 sequential requests', steps: 'Measure GET /booking/{id}', expected: 'Response time under 1000 ms', priority: 'Medium', severity: 'Medium', status: 'Planned', type: 'Performance', automation: 'Yes', endpoint: '/booking/{id}', method: 'GET' },
  { id: 'TC-012', module: 'Load', feature: 'Concurrent Booking Creation', requirement: 'REQ-08', preconditions: 'Load test environment', data: '50 parallel requests', steps: 'Create bookings concurrently', expected: 'No data corruption and acceptable error rate', priority: 'Medium', severity: 'Medium', status: 'Planned', type: 'Load', automation: 'No', endpoint: '/booking', method: 'POST' },
  { id: 'TC-013', module: 'Regression', feature: 'Backward Compatibility', requirement: 'REQ-09', preconditions: 'Baseline deployed', data: 'Existing booking IDs', steps: 'Run previous smoke suite', expected: 'No regressions in core CRUD flows', priority: 'Medium', severity: 'Medium', status: 'Planned', type: 'Regression', automation: 'Yes', endpoint: '/booking', method: 'GET/POST' },
  { id: 'TC-014', module: 'Security', feature: 'Header Validation', requirement: 'REQ-10', preconditions: 'API available', data: 'Missing or malformed headers', steps: 'Send requests without expected headers', expected: 'API rejects unauthorized requests', priority: 'High', severity: 'High', status: 'Planned', type: 'Security', automation: 'Yes', endpoint: '/booking', method: 'GET' },
  { id: 'TC-015', module: 'Data Validation', feature: 'Boundary Data', requirement: 'REQ-11', preconditions: 'Valid token', data: 'Long strings and empty values', steps: 'POST booking with boundary inputs', expected: 'Validation rules enforced', priority: 'Medium', severity: 'Medium', status: 'Planned', type: 'Boundary', automation: 'Yes', endpoint: '/booking', method: 'POST' }
];

const summaryCards = [
  { label: 'Total Test Cases', value: '15', tone: 'accent' },
  { label: 'Automation Ready', value: '13/15', tone: 'good' },
  { label: 'High Priority', value: '8', tone: 'warning' },
  { label: 'Security Coverage', value: '3', tone: 'danger' }
];

const coverageMatrix = [
  { endpoint: '/auth', method: 'POST', covered: 'Yes', cases: 'TC-001, TC-002', automation: 'Yes' },
  { endpoint: '/booking', method: 'POST', covered: 'Yes', cases: 'TC-003, TC-004, TC-012, TC-015', automation: 'Yes' },
  { endpoint: '/booking/{id}', method: 'GET', covered: 'Yes', cases: 'TC-005, TC-006, TC-011', automation: 'Yes' },
  { endpoint: '/booking/{id}', method: 'PUT', covered: 'Yes', cases: 'TC-007, TC-008', automation: 'Yes' },
  { endpoint: '/booking/{id}', method: 'DELETE', covered: 'Yes', cases: 'TC-009, TC-010', automation: 'Yes' }
];

const riskItems = [
  { level: 'High', title: 'Unauthorized booking modification', mitigation: 'Enforce auth checks and negative security tests' },
  { level: 'Medium', title: 'Data validation gaps', mitigation: 'Add boundary and malformed input cases' },
  { level: 'Low', title: 'Performance degradation under load', mitigation: 'Run load and stress tests in CI' }
];

const traceabilityRows = [
  { requirement: 'REQ-01', scenario: 'Authentication success', cases: 'TC-001', automation: 'Yes' },
  { requirement: 'REQ-02', scenario: 'Authentication failure', cases: 'TC-002', automation: 'Yes' },
  { requirement: 'REQ-03', scenario: 'Create booking', cases: 'TC-003, TC-004', automation: 'Yes' },
  { requirement: 'REQ-04', scenario: 'Read booking', cases: 'TC-005, TC-006', automation: 'Yes' },
  { requirement: 'REQ-05', scenario: 'Update booking', cases: 'TC-007, TC-008', automation: 'Yes' },
  { requirement: 'REQ-06', scenario: 'Delete booking', cases: 'TC-009, TC-010', automation: 'Yes' }
];

function App() {
  const [query, setQuery] = useState('');
  const [module, setModule] = useState('All');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState('dark');
  const pageSize = 6;

  const filteredCases = useMemo(() => {
    return initialCases.filter((item) => {
      const matchQuery = [item.id, item.module, item.feature, item.endpoint, item.requirement].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchModule = module === 'All' || item.module === module;
      const matchPriority = priority === 'All' || item.priority === priority;
      const matchStatus = status === 'All' || item.status === status;
      const matchType = type === 'All' || item.type === type;
      return matchQuery && matchModule && matchPriority && matchStatus && matchType;
    });
  }, [query, module, priority, status, type]);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / pageSize));
  const pagedCases = filteredCases.slice((page - 1) * pageSize, page * pageSize);

  const exportCsv = () => {
    const rows = [
      ['ID', 'Module', 'Feature', 'Priority', 'Status', 'Type', 'Automation', 'Endpoint', 'Method'],
      ...filteredCases.map((item) => [item.id, item.module, item.feature, item.priority, item.status, item.type, item.automation, item.endpoint, item.method])
    ];
    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'booker-test-cases.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    window.print();
  };

  const modules = ['All', ...new Set(initialCases.map((item) => item.module))];
  const priorities = ['All', 'High', 'Medium'];
  const statuses = ['All', 'Planned', 'Blocked'];
  const types = ['All', 'Positive', 'Negative', 'Security', 'Performance', 'Load', 'Regression', 'Boundary'];

  return (
    <div className={`app-shell ${theme}`}>
      <aside className="sidebar">
        <h1>QA Dashboard</h1>
        <p>Restful Booker API</p>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#scenarios">Scenarios</a>
          <a href="#cases">Cases</a>
          <a href="#coverage">Coverage</a>
          <a href="#risks">Risks</a>
        </nav>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </aside>

      <main className="content">
        <header id="overview" className="hero">
          <div>
            <h2>Restful Booker API Test Plan</h2>
            <p>Enterprise-grade QA plan for authentication, booking CRUD, security, load and regression coverage.</p>
          </div>
          <div className="hero-actions">
            <button onClick={exportCsv}>Export CSV</button>
            <button onClick={exportPdf}>Export PDF</button>
          </div>
        </header>

        <section className="cards">
          {summaryCards.map((card) => (
            <div key={card.label} className={`card ${card.tone}`}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          ))}
        </section>

        <section className="panel filters">
          <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search cases, endpoints, requirements" />
          <select value={module} onChange={(e) => { setModule(e.target.value); setPage(1); }}>
            {modules.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }}>
            {priorities.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
            {types.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </section>

        <section className="panel charts">
          <div>
            <h3>Execution Snapshot</h3>
            <svg viewBox="0 0 220 120" className="chart">
              <rect x="20" y="20" width="70" height="80" rx="8" fill="#4f46e5" />
              <rect x="100" y="40" width="70" height="60" rx="8" fill="#10b981" />
              <rect x="180" y="60" width="20" height="40" rx="8" fill="#f59e0b" />
            </svg>
          </div>
          <div>
            <h3>Automation Coverage</h3>
            <div className="meter"><span style={{ width: '87%' }} /></div>
            <p>87% of targeted cases are automation-ready.</p>
          </div>
        </section>

        <section id="scenarios" className="panel">
          <h3>Test Scenarios</h3>
          <ul className="scenario-list">
            <li>Positive and negative authentication scenarios</li>
            <li>CRUD lifecycle for bookings including create, read, update and delete</li>
            <li>Security and authorization validation for protected actions</li>
            <li>Boundary, performance, load and regression testing</li>
          </ul>
        </section>

        <section id="cases" className="panel">
          <h3>Detailed Test Cases</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Module</th>
                <th>Feature</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Type</th>
                <th>Endpoint</th>
              </tr>
            </thead>
            <tbody>
              {pagedCases.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.module}</td>
                  <td>{item.feature}</td>
                  <td>{item.priority}</td>
                  <td>{item.status}</td>
                  <td>{item.type}</td>
                  <td>{item.endpoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <span>Page {page} / {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </section>

        <section id="coverage" className="panel">
          <h3>API Coverage Matrix</h3>
          <table>
            <thead>
              <tr><th>Endpoint</th><th>Method</th><th>Covered</th><th>Test Cases</th><th>Automation</th></tr>
            </thead>
            <tbody>
              {coverageMatrix.map((row) => (
                <tr key={row.endpoint + row.method}><td>{row.endpoint}</td><td>{row.method}</td><td>{row.covered}</td><td>{row.cases}</td><td>{row.automation}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="risks" className="panel">
          <h3>Risk Dashboard</h3>
          <div className="risk-grid">
            {riskItems.map((risk) => (
              <div key={risk.title} className="risk-card">
                <strong>{risk.level}</strong>
                <h4>{risk.title}</h4>
                <p>{risk.mitigation}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Traceability Matrix</h3>
          <table>
            <thead><tr><th>Requirement</th><th>Scenario</th><th>Test Case</th><th>Automation</th></tr></thead>
            <tbody>
              {traceabilityRows.map((row) => (
                <tr key={row.requirement}><td>{row.requirement}</td><td>{row.scenario}</td><td>{row.cases}</td><td>{row.automation}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
