
export enum AppScreen {
  WELCOME = 'welcome',
  SIMULATION = 'simulation',
  ACTIVITIES = 'activities',
  TIMELINE = 'timeline',
}

export interface WaterCycleStage {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
