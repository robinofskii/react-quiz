import { useQuizContext } from '../../hooks/useQuizContext';
import { ActionTypes } from '../../types';

import './StartScreen.scss';

const StartScreen = () => {
  const { numQuestions, dispatch } = useQuizContext();

  return (
    <div id="start-screen-container">
      <h2>Welcome to The React Quiz</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: ActionTypes.START_QUIZ })}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
