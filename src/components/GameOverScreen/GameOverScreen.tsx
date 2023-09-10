import { Action, ActionTypes } from '../../types';

import './GameOverScreen.scss';

interface Props {
  highscore: number;
  points: number;
  maxPoints: number;
  dispatch: React.Dispatch<Action>;
}

const GameOverScreen = ({ points, maxPoints, dispatch }: Props) => {
  const percentage = Math.round((points / maxPoints) * 100);

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
        You scored <strong>{points}</strong> out of {maxPoints} points (
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
        onClick={() => dispatch({ type: ActionTypes.RESET })}
      >
        Reset
      </button>
    </section>
  );
};

export default GameOverScreen;
