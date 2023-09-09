import { Reducer, useEffect, useReducer } from 'react';

import Error from './components/Error/Error';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Main from './components/Main/Main';
import Question from './components/Question/Question';
import StartScreen from './components/StartScreen/StartScreen';
import { Action, QuestionType } from './types';

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
};

const initialState: State = {
  questions: [],
  status: Status.loading,
  currentQuestion: 0,
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
    default:
      console.error('Unknown action type');
      return state;
  }
};

function App() {
  const [{ questions, status, currentQuestion }, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(() => {
    dispatch({ type: 'FETCH_QUESTIONS' });
    fetch('http://localhost:3001/questions')
      .then((res) => res.json())
      .then((data: QuestionType[]) => {
        dispatch({ type: 'FETCH_QUESTIONS_SUCCESS', payload: data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_QUESTIONS_ERROR' });
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
      content = <Question question={questions[currentQuestion]} />;
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
