import { QuestionType } from '../../../types';

import './Options.scss';

interface Props {
  question: QuestionType;
}

const Options = ({ question }: Props) => {
  return (
    <div className="question-options-container">
      {question.options.map((option, index) => (
        <button key={index} className="btn btn-option">
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
