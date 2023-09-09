import { Action } from '../../App';
import './StartScreen.scss';

interface Props {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

const StartScreen = ({ numQuestions, dispatch }: Props) => {
  return (
    <div id="start-screen-container">
      <h2>Welcome to The React Quiz</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: 'START_QUIZ' })}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;
