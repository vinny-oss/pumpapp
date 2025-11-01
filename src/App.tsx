import { useState, useEffect } from 'react';
import type { AppState, PillarState } from './types';
import { initializeState, saveState, isAllPillarsComplete } from './utils';
import Character from './components/Character';
import PillarCard from './components/PillarCard';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [appState, setAppState] = useState<AppState>(initializeState());

  useEffect(() => {
    saveState(appState);
  }, [appState]);

  const togglePillar = (pillar: keyof PillarState) => {
    setAppState(prev => ({
      ...prev,
      currentPillars: {
        ...prev.currentPillars,
        [pillar]: !prev.currentPillars[pillar],
      },
    }));
  };

  const resetDay = () => {
    if (confirm('Are you sure you want to reset today\'s progress?')) {
      setAppState(prev => ({
        ...prev,
        currentPillars: {
          lift: false,
          water: false,
          sleep: false,
          fuel: false,
        },
      }));
    }
  };

  const pillars = [
    {
      key: 'lift' as const,
      title: 'Lift / Gym',
      emoji: '💪',
      description: 'Get your workout in! Hit the gym, lift weights, or do any physical exercise.',
      color: '#e74c3c',
    },
    {
      key: 'water' as const,
      title: 'Hydration',
      emoji: '💧',
      description: 'Stay hydrated! Drink plenty of water throughout the day.',
      color: '#3498db',
    },
    {
      key: 'sleep' as const,
      title: 'Sleep / Rest',
      emoji: '😴',
      description: 'Get quality sleep! Rest and recover for optimal performance.',
      color: '#9b59b6',
    },
    {
      key: 'fuel' as const,
      title: 'Fuel / Nutrition',
      emoji: '🍔',
      description: 'Eat well! Fuel your body with nutritious food.',
      color: '#2ecc71',
    },
  ];

  const isFullyPumped = isAllPillarsComplete(appState.currentPillars);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-emoji">💪</span>
          PUMP APP
          <span className="title-emoji">🔥</span>
        </h1>
        <p className="app-subtitle">Track your 4 pillars of fitness</p>
      </header>

      <main className="app-main">
        {isFullyPumped && (
          <div className="celebration-banner">
            🎉 LEGENDARY! You've completed all 4 pillars today! 🎉
          </div>
        )}

        <Character pillars={appState.currentPillars} />

        <Stats
          currentStreak={appState.currentStreak}
          bestStreak={appState.bestStreak}
        />

        <div className="pillars-grid">
          {pillars.map(pillar => (
            <PillarCard
              key={pillar.key}
              title={pillar.title}
              emoji={pillar.emoji}
              active={appState.currentPillars[pillar.key]}
              onToggle={() => togglePillar(pillar.key)}
              description={pillar.description}
              color={pillar.color}
            />
          ))}
        </div>

        <div className="app-actions">
          <button className="reset-button" onClick={resetDay}>
            Reset Today
          </button>
        </div>
      </main>

      <footer className="app-footer">
        <p>Complete all 4 pillars daily to build your streak! 🏆</p>
      </footer>
    </div>
  );
}

export default App;
