import { Reducer, useEffect, useReducer } from 'react';

import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Main from './components/Main/Main';
import Question from './components/Question/Question';
import StartScreen from './components/StartScreen/StartScreen';
import { Action, ActionTypes, QuestionType } from './types';

import './App.scss';

enum Status {
  'loading',
  'success',
  'error',
  'active',
  'done',
}

type State = {
  questions: QuestionType[];
  status: Status;
  currentQuestion: number;
  playerAnswer?: number;
  points: number;
};

const initialState: State = {
  questions: [],
  status: Status.loading,
  currentQuestion: 0,
  playerAnswer: undefined,
  points: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_QUESTIONS':
      return { ...state, status: Status.loading };
    case 'FETCH_QUESTIONS_SUCCESS':
      return { ...state, status: Status.success, questions: action.payload };
    case 'FETCH_QUESTIONS_ERROR':
      return { ...state, status: Status.error };
    case 'START_QUIZ':
      return { ...state, status: Status.active };
    case 'NEXT_QUESTION': {
      if (state.currentQuestion === state.questions.length - 1) {
        return { ...state, status: Status.done };
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        playerAnswer: undefined,
      };
    }
    case 'PLAYER_ANSWER': {
      const question = state.questions[state.currentQuestion];
      const isCorrect = action.payload === question.correctOption;

      return {
        ...state,
        playerAnswer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case 'RESET':
      return {
        questions: state.questions,
        status: Status.success,
        currentQuestion: 0,
        playerAnswer: undefined,
        points: 0,
      };
    default:
      console.error('Unknown action type');
      return state;
  }
};

function App() {
  const [
    { questions, status, currentQuestion, playerAnswer, points },
    dispatch,
  ] = useReducer<Reducer<State, Action>>(reducer, initialState);

  const numQuestions = questions.length;

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

  let content;
  switch (status) {
    case Status.loading:
      content = <Loader />;
      break;
    case Status.error:
      content = <Error />;
      break;
    case Status.success:
      content = <StartScreen numQuestions={numQuestions} dispatch={dispatch} />;
      break;
    case Status.active:
      content = (
        <>
          <p>Points: {points}</p>
          <Question
            question={questions[currentQuestion]}
            dispatch={dispatch}
            answer={playerAnswer}
          />
        </>
      );
      break;
    case Status.done:
      content = (
        <>
          <p>Points: {points}</p>
          <p>Done!</p>
          <button
            className="btn btn-warning"
            onClick={() => dispatch({ type: ActionTypes.RESET })}
          >
            Reset
          </button>
        </>
      );
      break;
    default:
      content =
        'Something went wrong with loading the app, contact the developer.';
      break;
  }

  return (
    <div id="app">
      <Header />
      <Main>{content}</Main>
    </div>
  );
}

export default App;
