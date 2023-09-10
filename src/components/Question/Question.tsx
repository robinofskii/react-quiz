import { Action, ActionTypes, QuestionType } from '../../types';

import Options from './Options/Options';

import './Question.scss';

interface Props {
  question: QuestionType;
  dispatch: React.Dispatch<Action>;
  answer: number | undefined;
}

const Question = ({ question, dispatch, answer }: Props) => {
  return (
    <div className="question-container">
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
      {answer !== undefined && (
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: ActionTypes.NEXT_QUESTION })}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Question;
