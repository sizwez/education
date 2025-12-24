
export enum GradeLevel {
  FOUNDATION = 'Grade R-3',
  INTERMEDIATE = 'Grade 4-6',
  SENIOR = 'Grade 7-9',
  FET = 'Grade 10-12',
  TERTIARY = 'University/TVET'
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  grade: GradeLevel;
  curriculum: 'NSC' | 'IEB' | 'General';
  instructor: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  modulesCount: number;
  isPremium?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface UserProgress {
  subject: string;
  completed: number;
  total: number;
  score: number;
}
