export enum ProfileType {
  EXPLORADOR = 'E',
  ARTISTICO = 'A',
  ANALITICO = 'N',
}

export enum ResultMode {
  SINGLE = 'single',
  HYBRID_BALANCED = 'hybrid_balanced',
  HYBRID_TIE = 'hybrid_tie',
}

export interface UserLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  consentMarketing: boolean;
  createdAt: number;
}

export interface QuestionOption {
  tag: ProfileType;
  text: string;
}

export interface Question {
  id: number;
  title: string;
  options: QuestionOption[];
}

export interface QuizSession {
  scoreE: number;
  scoreA: number;
  scoreN: number;
  resultDominant: ProfileType;
  resultSupport: ProfileType | null;
  resultMode: ResultMode;
}

export type Step = 'LEAD_GATE' | 'INTRO' | 'QUIZ' | 'RESULT';