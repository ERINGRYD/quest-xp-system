
export interface Attribute {
  id: string;
  name: string;
  currentXP: number;
  nextLevelXP: number;
  level: number;
  color: string;
  icon: string;
}

export interface Task {
  id: string;
  name: string;
  symbolicName: string;
  instruction: string;
  attributeId: string;
  xpValue: number;
  estimatedTime: number; // in minutes
  completed: boolean;
  completedAt?: Date;
  lastIgnoredDate?: Date;
  consecutiveIgnores: number;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  attributeId: string;
  xpValue: number;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompletedDate?: Date;
  subHabits?: SubHabit[];
}

export interface SubHabit {
  id: string;
  name: string;
  completed: boolean;
}

export interface Level {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  habits: Habit[];
  requiredXP: number;
  unlocked: boolean;
}

export interface Goal {
  id: string;
  name: string;
  description: string;
  levels: Level[];
  currentLevel: number;
  totalXP: number;
}

export interface Journey {
  id: string;
  name: string;
  description: string;
  goal: Goal;
  heroStage: HeroStage;
  progress: number;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  journey: Journey;
  icon: string;
}

export interface SubArea {
  id: string;
  name: string;
  description: string;
  themes: Theme[];
  color: string;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  subAreas: SubArea[];
  color: string;
  icon: string;
}

export type HeroStage = 
  | 'ordinary-world'
  | 'call-to-adventure'
  | 'meeting-mentor'
  | 'crossing-threshold'
  | 'tests-allies-enemies'
  | 'approach-ordeal'
  | 'reward'
  | 'road-back'
  | 'resurrection'
  | 'return-elixir';
