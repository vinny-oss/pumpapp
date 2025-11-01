import type { AppState, PillarState, DailyProgress } from './types';
import { DEFAULT_PILLAR_STATE } from './types';

const STORAGE_KEY = 'pump_app_state';

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const loadState = (): AppState | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
  return null;
};

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
};

export const isAllPillarsComplete = (pillars: PillarState): boolean => {
  return pillars.lift && pillars.water && pillars.sleep && pillars.fuel;
};

export const calculateStreak = (history: DailyProgress[]): number => {
  let streak = 0;
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));

  for (const day of sorted) {
    if (day.completed) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export const initializeState = (): AppState => {
  const stored = loadState();
  const today = getTodayString();

  if (stored && stored.lastUpdated === today) {
    // Same day, return stored state
    return stored;
  }

  // New day or no stored state
  if (stored) {
    // Save yesterday's progress
    const wasCompleted = isAllPillarsComplete(stored.currentPillars);
    const yesterdayProgress: DailyProgress = {
      date: stored.lastUpdated,
      pillars: stored.currentPillars,
      completed: wasCompleted,
    };

    const newHistory = [...stored.history, yesterdayProgress];
    const newStreak = calculateStreak(newHistory);

    return {
      currentPillars: { ...DEFAULT_PILLAR_STATE },
      history: newHistory,
      currentStreak: newStreak,
      bestStreak: Math.max(stored.bestStreak, newStreak),
      lastUpdated: today,
    };
  }

  // First time user
  return {
    currentPillars: { ...DEFAULT_PILLAR_STATE },
    history: [],
    currentStreak: 0,
    bestStreak: 0,
    lastUpdated: today,
  };
};

export const getCharacterState = (pillars: PillarState): string => {
  // Create a unique key for each combination
  const key = `${pillars.lift ? '1' : '0'}${pillars.water ? '1' : '0'}${pillars.sleep ? '1' : '0'}${pillars.fuel ? '1' : '0'}`;
  return key;
};
