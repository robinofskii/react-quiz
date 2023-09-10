import { useQuizContext } from '../../hooks/useQuizContext';

import './Progress.scss';

const Progress = () => {
  const { currentQuestion, numQuestions, points, maxPossiblePoints } =
    useQuizContext();

  return (
    <header className="progress-container">
      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${(currentQuestion / numQuestions) * 100}%`,
          }}
        />
      </div>
      <div className="progress-info">
        <div className="progress-info__question">
          <p>
            Question: {currentQuestion} / {numQuestions}
          </p>
        </div>
        <div className="progress-info__points">
          <p>
            {points} / {maxPossiblePoints} points
          </p>
        </div>
      </div>
    </header>
  );
};

export default Progress;
