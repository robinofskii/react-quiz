import { QuestionType } from './question.types';

export enum ActionTypes {
  FETCH_QUESTIONS = 'FETCH_QUESTIONS',
  FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS',
  FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR',
  START_QUIZ = 'START_QUIZ',
  NEXT_QUESTION = 'NEXT_QUESTION',
  PLAYER_ANSWER = 'PLAYER_ANSWER',
  RESET = 'RESET',
  DONE = 'DONE',
}

interface FetchQuestionsAction {
  type: ActionTypes.FETCH_QUESTIONS;
}

interface FetchQuestionsSuccessAction {
  type: ActionTypes.FETCH_QUESTIONS_SUCCESS;
  payload: QuestionType[];
}

interface FetchQuestionsErrorAction {
  type: ActionTypes.FETCH_QUESTIONS_ERROR;
}

interface StartQuizAction {
  type: ActionTypes.START_QUIZ;
}

interface NextQuestionAction {
  type: ActionTypes.NEXT_QUESTION;
}

interface PlayerAnswerAction {
  type: ActionTypes.PLAYER_ANSWER;
  payload: QuestionType['correctOption'];
}

interface ResetAction {
  type: ActionTypes.RESET;
}

interface DoneAction {
  type: ActionTypes.DONE;
}

export type Action =
  | FetchQuestionsAction
  | FetchQuestionsSuccessAction
  | FetchQuestionsErrorAction
  | StartQuizAction
  | NextQuestionAction
  | PlayerAnswerAction
  | ResetAction
  | DoneAction;
