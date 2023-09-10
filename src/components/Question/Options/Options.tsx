import { clsx } from 'clsx';

import { useQuizContext } from '../../../hooks/useQuizContext';
import { ActionTypes, QuestionType } from '../../../types';

import './Options.scss';

interface Props {
  question: QuestionType;
}

const Options = ({ question }: Props) => {
  const { dispatch, playerAnswer } = useQuizContext();

  const hasAnswered = playerAnswer !== undefined;

  return (
    <div className="question-options-container">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={clsx('btn btn-option', {
            correct:
              (playerAnswer === question.correctOption &&
                playerAnswer === index) ||
              (hasAnswered &&
                playerAnswer !== question.correctOption &&
                question.correctOption === index),
            incorrect:
              playerAnswer !== question.correctOption && playerAnswer === index,
          })}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: ActionTypes.PLAYER_ANSWER, payload: index })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
