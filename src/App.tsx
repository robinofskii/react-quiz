import Header from './components/Header/Header';
import Main from './components/Main/Main';

import './App.scss';
import { Reducer, useEffect, useReducer } from 'react';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import StartScreen from './components/StartScreen/StartScreen';
import Question from './components/Question/Question';

enum Status {
  'loading',
  'success',
  'error',
  'active',
  'done',
}

type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type Action =
  | { type: 'FETCH_QUESTIONS' }
  | { type: 'FETCH_QUESTIONS_SUCCESS'; payload: Question[] }
  | { type: 'FETCH_QUESTIONS_ERROR' }
  | { type: 'START_QUIZ' };

type State = {
  questions: Question[];
  status: Status;
  currentQuestion?: number;
};

const initialState: State = {
  questions: [],
  status: Status.loading,
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
  const [{ questions, status }, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(() => {
    dispatch({ type: 'FETCH_QUESTIONS' });
    fetch('http://localhost:3001/questions')
      .then((res) => res.json())
      .then((data: Question[]) => {
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
      content = <Question />;
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
