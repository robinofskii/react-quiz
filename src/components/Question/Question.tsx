import { QuestionType } from '../../types/question.types';

import Options from './Options/Options';

import './Question.scss';

interface Props {
  question: QuestionType;
}

const Question = ({ question }: Props) => {
  return (
    <div className="question-container">
      <h3>{question.question}</h3>
      <Options question={question} />
    </div>
  );
};

export default Question;
