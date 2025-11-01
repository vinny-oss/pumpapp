export interface PillarState {
  lift: boolean;
  water: boolean;
  sleep: boolean;
  fuel: boolean;
}

export interface DailyProgress {
  date: string;
  pillars: PillarState;
  completed: boolean;
}

export interface AppState {
  currentPillars: PillarState;
  history: DailyProgress[];
  currentStreak: number;
  bestStreak: number;
  lastUpdated: string;
}

export const DEFAULT_PILLAR_STATE: PillarState = {
  lift: false,
  water: false,
  sleep: false,
  fuel: false,
};
