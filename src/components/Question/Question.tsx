import { useQuizContext } from '../../hooks/useQuizContext';
import { ActionTypes } from '../../types';
import Footer from '../Footer/Footer';
import Timer from '../Timer/Timer';

import Options from './Options/Options';

import './Question.scss';

const Question = () => {
  const { questions, currentQuestion, playerAnswer, numQuestions, dispatch } =
    useQuizContext();

  const question = questions[currentQuestion];

  return (
    <>
      <section className="question-container">
        <h3>{question.question}</h3>
        <Options question={question} />
      </section>
      <Footer>
        <Timer />
        {playerAnswer !== undefined && currentQuestion !== numQuestions - 1 && (
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: ActionTypes.NEXT_QUESTION })}
          >
            <p>Next</p>
          </button>
        )}
        {playerAnswer !== undefined && currentQuestion === numQuestions - 1 && (
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
};

export default Question;
