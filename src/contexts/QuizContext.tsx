import { createContext, Reducer, useEffect, useReducer } from 'react';

import { QuizStatus } from '../CONSTANTS';
import { Action, ActionTypes, QuestionType } from '../types';

const SECONDS_PER_QUESTION = 10;

type State = {
  questions: QuestionType[];
  status: QuizStatus;
  currentQuestion: number;
  playerAnswer?: number;
  points: number;
  highscore: number;
  secondsRemaining: number;
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<Action>;
};

const initialState: State = {
  questions: [],
  status: QuizStatus.loading,
  currentQuestion: 0,
  playerAnswer: undefined,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
  numQuestions: 0,
  maxPossiblePoints: 0,
  dispatch: () => null,
};

export const QuizContext = createContext<State>(initialState);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.FETCH_QUESTIONS:
      return { ...state, status: QuizStatus.loading };
    case ActionTypes.FETCH_QUESTIONS_SUCCESS:
      return { ...state, status: QuizStatus.ready, questions: action.payload };
    case ActionTypes.FETCH_QUESTIONS_ERROR:
      return { ...state, status: QuizStatus.error };
    case ActionTypes.START_QUIZ:
      return {
        ...state,
        status: QuizStatus.active,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case ActionTypes.NEXT_QUESTION: {
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        playerAnswer: undefined,
      };
    }
    case ActionTypes.PLAYER_ANSWER: {
      const question = state.questions[state.currentQuestion];
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        playerAnswer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case ActionTypes.TIMER_TICK:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? QuizStatus.done : state.status,
      };
    case ActionTypes.DONE:
      return {
        ...state,
        status: QuizStatus.done,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ActionTypes.RESET:
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: QuizStatus.ready,
      };
    default:
      console.error('Unknown action type');
      return state;
  }
};

const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [
    {
      status,
      questions,
      currentQuestion,
      playerAnswer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer<Reducer<State, Action>>(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    dispatch({ type: ActionTypes.FETCH_QUESTIONS });
    fetch('http://localhost:3001/questions')
      .then((res) => res.json())
      .then((data: QuestionType[]) => {
        dispatch({ type: ActionTypes.FETCH_QUESTIONS_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: ActionTypes.FETCH_QUESTIONS_ERROR });
        console.error(err);
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestion,
        playerAnswer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
