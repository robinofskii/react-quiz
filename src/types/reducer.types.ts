import { QuestionType } from './question.types';

export type Action =
  | { type: 'FETCH_QUESTIONS' }
  | { type: 'FETCH_QUESTIONS_SUCCESS'; payload: QuestionType[] }
  | { type: 'FETCH_QUESTIONS_ERROR' }
  | { type: 'START_QUIZ' };
