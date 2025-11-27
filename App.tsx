import React, { useState } from 'react';
import HomePage from './components/HomePage';
import SolarSystemModule from './components/SolarSystemModule';

type View = 'home' | 'solar-system';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigate = (route: string) => {
    if (route === 'solar-system') {
      setCurrentView('solar-system');
    }
    // Expand here for future apps
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="w-full h-screen bg-slate-950 text-white">
      {currentView === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentView === 'solar-system' && (
        <SolarSystemModule onBack={handleBackToHome} />
      )}
    </div>
  );
};

export default App;