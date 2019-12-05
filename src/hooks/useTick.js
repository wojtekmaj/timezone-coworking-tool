import { useCallback, useState } from 'react';
import useSetInterval from './useSetInterval';

/**
 * Counts from 0, increasing the number every second
 *
 * @param {Number} delay Interval between ticks (in ms)
 */
export default function useTick(delay) {
  const [tick, setTick] = useState(0);
  const doTick = useCallback(() => {
    setTick((prevSeconds) => prevSeconds + 1);
  }, []);

  useSetInterval(doTick, delay);

  return tick;
}
