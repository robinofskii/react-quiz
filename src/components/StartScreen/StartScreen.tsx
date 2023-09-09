import './StartScreen.scss';

interface Props {
  numQuestions: number;
}

const StartScreen = ({ numQuestions }: Props) => {
  return (
    <div id="start-screen-container">
      <h2>Welcome to The React Quiz</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button className="btn btn-primary">Start Quiz</button>
    </div>
  );
};

export default StartScreen;
