import { useEffect } from 'react';

import { useQuizContext } from '../../hooks/useQuizContext';
import { ActionTypes } from '../../types';

import './Timer.scss';

const Timer = () => {
  const { dispatch, secondsRemaining } = useQuizContext();

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
