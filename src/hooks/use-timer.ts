import { useCallback, useEffect, useState } from 'react';

interface UseTimerOptions {
  initialSeconds?: number;
  autoStart?: boolean;
}

interface UseTimerReturn {
  seconds: number;
  isRunning: boolean;
  start: (seconds?: number) => void;
  reset: () => void;
  formattedTime: string;
}

const useTimer = (options: UseTimerOptions = {}): UseTimerReturn => {
  const { initialSeconds = 60, autoStart = false } = options;

  const [seconds, setSeconds] = useState(autoStart ? initialSeconds : 0);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds <= 0 && isRunning) {
        setIsRunning(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const start = useCallback(
    (customSeconds?: number) => {
      setSeconds(customSeconds ?? initialSeconds);
      setIsRunning(true);
    },
    [initialSeconds]
  );

  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);

  const formattedTime = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

  return {
    seconds,
    isRunning,
    start,
    reset,
    formattedTime,
  };
};

export default useTimer;
