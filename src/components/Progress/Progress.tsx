import './Progress.scss';

interface Props {
  currentQuestion: number;
  totalQuestions: number;
  points: number;
  maxPoints: number;
}

const Progress = ({
  currentQuestion,
  totalQuestions,
  points,
  maxPoints,
}: Props) => {
  return (
    <header className="progress-container">
      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${((currentQuestion - 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>
      <div className="progress-info">
        <div className="progress-info__question">
          <p>
            Question: {currentQuestion} / {totalQuestions}
          </p>
        </div>
        <div className="progress-info__points">
          <p>
            {points} / {maxPoints} points
          </p>
        </div>
      </div>
    </header>
  );
};

export default Progress;
