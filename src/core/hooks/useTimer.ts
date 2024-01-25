import { useCallback, useEffect, useRef, useState } from 'react';

let timer = setInterval(() => {}, 1000);

export const useTimer = (delay: number) => {
  const [timeLeft, setTimeLeft] = useState(delay);
  const timerRef = useRef(timeLeft);

  const stopTimer = useCallback(() => {
    clearInterval(timer);
  }, []);

  const startTimer = useCallback(() => {
    timer = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        stopTimer();
        return false;
      } else {
        setTimeLeft(timerRef.current);
      }
    }, 1000);
  }, [stopTimer]);

  const resetTimer = useCallback(() => {
    setTimeLeft(delay);
    timerRef.current = delay;
    startTimer();
  }, [delay, startTimer]);

  useEffect(() => () => clearInterval(timer), [startTimer]);

  return { timeLeft, resetTimer, startTimer, stopTimer };
};
