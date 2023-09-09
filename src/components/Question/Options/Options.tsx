import { clsx } from 'clsx';

import { Action, QuestionType } from '../../../types';

import './Options.scss';

interface Props {
  question: QuestionType;
  dispatch: React.Dispatch<Action>;
  answer: number | undefined;
}

const Options = ({ question, dispatch, answer }: Props) => {
  const hasAnswered = answer !== undefined;

  return (
    <div className="question-options-container">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={clsx('btn btn-option', {
            correct:
              (answer === question.correctOption && answer === index) ||
              (hasAnswered &&
                answer !== question.correctOption &&
                question.correctOption === index),
            incorrect: answer !== question.correctOption && answer === index,
          })}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'PLAYER_ANSWER', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
