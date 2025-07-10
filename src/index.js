import React, { useState, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Button Text
const sectionTitles = {
  section1: 'Introduction',
  section2: 'Exploratory Data Analysis',
  section3: 'Trivial Model and Metrics',
  section4: 'Training the Model',
  section5: 'Evaluation',
  section6: 'Visualization',
  section7: 'Conclusion',
};

// Button Link
const Section1 = lazy(() => import('./components/001_intro'));
const Section2 = lazy(() => import('./components/002_exploratoryDataAnalysis'));
const Section3 = lazy(() => import('./components/003_trivial'));
const Section4 = lazy(() => import('./components/004_training'));
const Section5 = lazy(() => import('./components/005_evaluation'));
const Section6 = lazy(() => import('./components/006_visualization'));
const Section7 = lazy(() => import('./components/007_conclusion'));

const App = () => {
  const [activeSection, setActiveSection] = useState('section1');
  
  // Button Func
  const renderSection = () => {
    switch (activeSection) {
      case 'section1':
        return <Section1 />;
      case 'section2':
        return <Section2 />;
      case 'section3':
        return <Section3 />;
      case 'section4':
        return <Section4 />;
      case 'section5':
        return <Section5 />;
      case 'section6':
        return <Section6 />;
      case 'section7':
        return <Section7 />;
      default:
        return <Section1 />;
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Not Medium</h1>
      </header>

      <aside className="sidebar">
        <ul>
          {Object.keys(sectionTitles).map((section) => (
            <li key={section}>
              <button onClick={() => setActiveSection(section)}>
                {sectionTitles[section]}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            {renderSection()}
          </Suspense>
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
