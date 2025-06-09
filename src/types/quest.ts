
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
  phases: HeroPhase[];
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

export interface HeroPhase {
  id: string;
  name: string;
  stage: HeroStage;
  description: string;
  symbolicMeaning: string;
  miniTask: Task;
  reflection: string;
  ritual: string;
  completed: boolean;
  unlockedAt?: Date;
}

export type EmotionalClimate = 
  | 'clear-sky'      // ☀️ Céu Claro
  | 'inner-rain'     // 🌧️ Chuva Interior  
  | 'mind-storm'     // 🌪️ Tempestade Mental
  | 'snow'           // ❄️ Neve
  | 'fog'            // 🌫️ Nevoeiro
  | 'scorching-sun'  // 🔥 Sol Escaldante
  | 'alignment';     // 🌈 Alinhamento

export interface ClimateData {
  climate: EmotionalClimate;
  icon: string;
  name: string;
  message: string;
  idealTaskTypes: string[];
  color: string;
}

export interface DailySymbolicMessage {
  id: string;
  date: Date;
  climate: EmotionalClimate;
  message: string;
  tone: 'motivational' | 'reflective' | 'challenging' | 'celebratory';
  basedOn: {
    recentXP: number;
    activeHabits: number;
    negligectedTasks: number;
    mood: number; // 1-10 scale
  };
}

export interface UserMood {
  date: Date;
  level: number; // 1-10 scale
  notes?: string;
}
