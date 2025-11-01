import './PillarCard.css';

interface PillarCardProps {
  title: string;
  emoji: string;
  active: boolean;
  onToggle: () => void;
  description: string;
  color: string;
}

const PillarCard: React.FC<PillarCardProps> = ({
  title,
  emoji,
  active,
  onToggle,
  description,
  color,
}) => {
  return (
    <div
      className={`pillar-card ${active ? 'active' : ''}`}
      style={{ '--pillar-color': color } as React.CSSProperties}
      onClick={onToggle}
    >
      <div className="pillar-header">
        <div className="pillar-emoji">{emoji}</div>
        <h3 className="pillar-title">{title}</h3>
      </div>
      <p className="pillar-description">{description}</p>
      <div className="pillar-toggle">
        <div className={`toggle-switch ${active ? 'on' : 'off'}`}>
          <div className="toggle-slider"></div>
        </div>
        <span className="toggle-label">{active ? 'Completed ✓' : 'Tap to complete'}</span>
      </div>
    </div>
  );
};

export default PillarCard;
