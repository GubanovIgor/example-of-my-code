import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Params {
  callback: () => void;
  delay: number | null;
  stopCount?: number;
  shouldStart?: boolean;
}

export const useInterval = ({
  callback,
  delay,
  stopCount,
  shouldStart = true,
}: Params) => {
  const [intervalCount, setIntervalCount] = useState(0);

  const savedCallback = useRef(callback);
  let intervalRef = useRef<NodeJS.Timer | null>(null);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!stopCount) return;

    if (stopCount === intervalCount && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [intervalCount, stopCount]);

  useEffect(() => {
    if (!shouldStart || (!delay && delay !== 0)) {
      return;
    }

    intervalRef.current = setInterval(() => {
      savedCallback.current();
      if (stopCount) setIntervalCount((prev) => prev + 1);
    }, delay);

    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const reset = (newDelay: number) => {
    if (!intervalRef.current) return;

    intervalRef.current = setInterval(savedCallback.current, newDelay);
  };

  const stop = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
  };

  return { reset, stop };
};
