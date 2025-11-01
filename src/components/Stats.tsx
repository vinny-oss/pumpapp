import './Stats.css';

interface StatsProps {
  currentStreak: number;
  bestStreak: number;
}

const Stats: React.FC<StatsProps> = ({ currentStreak, bestStreak }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">🔥</div>
        <div className="stat-content">
          <div className="stat-value">{currentStreak}</div>
          <div className="stat-label">Current Streak</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🏆</div>
        <div className="stat-content">
          <div className="stat-value">{bestStreak}</div>
          <div className="stat-label">Best Streak</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
