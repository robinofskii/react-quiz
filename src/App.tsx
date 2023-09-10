import { Reducer, useEffect, useReducer } from 'react';

import Error from './components/Error/Error';
import Footer from './components/Footer/Footer';
import GameOverScreen from './components/GameOverScreen/GameOverScreen';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import Main from './components/Main/Main';
import Progress from './components/Progress/Progress';
import Question from './components/Question/Question';
import StartScreen from './components/StartScreen/StartScreen';
import Timer from './components/Timer/Timer';
import { Action, ActionTypes, QuestionType } from './types';

import './App.scss';

const SECONDS_PER_QUESTION = 10;

enum Status {
  'loading',
  'ready',
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
  highscore: number;
  secondsRemaining: number;
};

const initialState: State = {
  questions: [],
  status: Status.loading,
  currentQuestion: 0,
  playerAnswer: undefined,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.FETCH_QUESTIONS:
      return { ...state, status: Status.loading };
    case ActionTypes.FETCH_QUESTIONS_SUCCESS:
      return { ...state, status: Status.ready, questions: action.payload };
    case ActionTypes.FETCH_QUESTIONS_ERROR:
      return { ...state, status: Status.error };
    case ActionTypes.START_QUIZ:
      return {
        ...state,
        status: Status.active,
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
        status: state.secondsRemaining === 0 ? Status.done : state.status,
      };
    case ActionTypes.DONE:
      return {
        ...state,
        status: Status.done,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ActionTypes.RESET:
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: Status.ready,
      };
    default:
      console.error('Unknown action type');
      return state;
  }
};

function App() {
  const [
    {
      questions,
      status,
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

  let content;
  switch (status) {
    case Status.loading:
      content = <Loader />;
      break;
    case Status.error:
      content = <Error />;
      break;
    case Status.ready:
      content = <StartScreen numQuestions={numQuestions} dispatch={dispatch} />;
      break;
    case Status.active:
      content = (
        <>
          <Progress
            currentQuestion={currentQuestion + 1}
            totalQuestions={numQuestions}
            points={points}
            maxPoints={maxPossiblePoints}
          />
          <Question
            question={questions[currentQuestion]}
            dispatch={dispatch}
            answer={playerAnswer}
          />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            {playerAnswer !== undefined &&
              currentQuestion !== numQuestions - 1 && (
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch({ type: ActionTypes.NEXT_QUESTION })}
                >
                  <p>Next</p>
                </button>
              )}
            {playerAnswer !== undefined &&
              currentQuestion === numQuestions - 1 && (
                <button
                  className="btn btn-info"
                  onClick={() => dispatch({ type: ActionTypes.DONE })}
                >
                  <p>Done</p>
                </button>
              )}
          </Footer>
        </>
      );
      break;
    case Status.done:
      content = (
        <GameOverScreen
          dispatch={dispatch}
          points={points}
          maxPoints={maxPossiblePoints}
          highscore={highscore}
        />
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
