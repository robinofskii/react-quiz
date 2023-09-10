import { useQuizContext } from '../../hooks/useQuizContext';
import { ActionTypes } from '../../types';

import './GameOverScreen.scss';

const GameOverScreen = () => {
  const { points, maxPossiblePoints, dispatch } = useQuizContext();

  const percentage = Math.round((points / maxPossiblePoints) * 100);

  const colorbasedOnPercentage = () => {
    if (percentage < 50) {
      return 'error';
    }

    if (percentage < 75) {
      return 'warning';
    }

    return 'success';
  };

  return (
    <section className="game-over-screen-container">
      <h2>Game Over</h2>
      <p>
        You scored <strong>{points}</strong> out of {maxPossiblePoints} points (
        <span className={`color-${colorbasedOnPercentage()}`}>
          {percentage}%
        </span>
        )
      </p>
      <p>
        Your highscore is <strong>{points}</strong> points
      </p>
      <button
        className="btn btn-warning"
        onClick={() => dispatch && dispatch({ type: ActionTypes.RESET })}
      >
        Reset
      </button>
    </section>
  );
};

export default GameOverScreen;
