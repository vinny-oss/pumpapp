import type { PillarState } from '../types';
import './Character.css';

interface CharacterProps {
  pillars: PillarState;
}

const Character: React.FC<CharacterProps> = ({ pillars }) => {
  const { lift, water, sleep, fuel } = pillars;

  // Determine character appearance based on pillars
  const getCharacterClass = () => {
    const classes = ['character'];

    if (lift && water && sleep && fuel) {
      classes.push('fully-pumped');
    } else if (!lift && !water && !sleep && !fuel) {
      classes.push('depleted');
    } else {
      classes.push('partial');
    }

    return classes.join(' ');
  };

  const getCharacterEmoji = () => {
    // All complete - fully pumped!
    if (lift && water && sleep && fuel) return '💪🔥';

    // None complete - depleted
    if (!lift && !water && !sleep && !fuel) return '😴💤';

    // Various combinations
    if (lift && !water && !sleep && !fuel) return '💪😓'; // Just lifted, needs recovery
    if (lift && water && !sleep && !fuel) return '💪💧'; // Gym + water, needs rest/food
    if (lift && water && sleep && !fuel) return '💪😋'; // Almost there, needs food
    if (lift && water && !sleep && fuel) return '💪😪'; // Pumped but tired
    if (lift && !water && sleep && !fuel) return '💪💤'; // Lifted and rested, needs fuel
    if (lift && !water && sleep && fuel) return '💪🍽️'; // Good but dehydrated
    if (lift && !water && !sleep && fuel) return '💪🍔'; // Lifted and ate, needs water/sleep

    if (!lift && water && !sleep && !fuel) return '💧😐'; // Just hydrated
    if (!lift && water && sleep && !fuel) return '😌💧'; // Rested and hydrated
    if (!lift && water && sleep && fuel) return '😊✨'; // Everything but gym
    if (!lift && water && !sleep && fuel) return '🍔💧'; // Fed and hydrated, tired

    if (!lift && !water && sleep && !fuel) return '😴'; // Just slept
    if (!lift && !water && sleep && fuel) return '😋💤'; // Slept and ate
    if (!lift && !water && !sleep && fuel) return '🍔😐'; // Just ate

    return '😐'; // Default
  };

  const getStatusMessage = () => {
    if (lift && water && sleep && fuel) {
      return "FULLY PUMPED! You're a beast! 🏆";
    }

    const missing = [];
    if (!lift) missing.push('Gym');
    if (!water) missing.push('Water');
    if (!sleep) missing.push('Sleep');
    if (!fuel) missing.push('Fuel');

    if (missing.length === 4) {
      return "Time to get started! Let's pump it up! 🚀";
    }

    if (missing.length === 1) {
      return `So close! Just need: ${missing[0]}`;
    }

    return `Keep going! Need: ${missing.join(', ')}`;
  };

  const getBodyStyle = () => {
    const baseSize = 150;
    let size = baseSize;

    // Character gets bigger with more pillars
    const activeCount = [lift, water, sleep, fuel].filter(Boolean).length;
    size = baseSize + (activeCount * 15);

    return {
      width: `${size}px`,
      height: `${size}px`,
    };
  };

  return (
    <div className={getCharacterClass()}>
      <div className="character-body" style={getBodyStyle()}>
        <div className="character-emoji">{getCharacterEmoji()}</div>
      </div>
      <div className="character-status">{getStatusMessage()}</div>

      <div className="pillar-indicators">
        <div className={`indicator ${lift ? 'active' : ''}`}>
          💪 {lift ? '✓' : '○'}
        </div>
        <div className={`indicator ${water ? 'active' : ''}`}>
          💧 {water ? '✓' : '○'}
        </div>
        <div className={`indicator ${sleep ? 'active' : ''}`}>
          😴 {sleep ? '✓' : '○'}
        </div>
        <div className={`indicator ${fuel ? 'active' : ''}`}>
          🍔 {fuel ? '✓' : '○'}
        </div>
      </div>
    </div>
  );
};

export default Character;
