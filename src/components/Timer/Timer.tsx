import { useEffect } from 'react';

import { Action, ActionTypes } from '../../types';

import './Timer.scss';

interface Props {
  dispatch: React.Dispatch<Action>;
  secondsRemaining: number;
}

const Timer = ({ dispatch, secondsRemaining }: Props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: ActionTypes.TIMER_TICK });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  const formattedTime = () => {
    const minutes = Math.floor(secondsRemaining / 60);
    const secondsLeft = secondsRemaining % 60;
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  };

  return (
    <div className="timer-container">
      <p>{formattedTime()}</p>
    </div>
  );
};

export default Timer;
