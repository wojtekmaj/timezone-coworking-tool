import { useEffect } from 'react';

/**
 * Runs a given function every n milliseconds
 *
 * @param {Function} fn Function to run
 * @param {Number} delay Interval between function runs (in ms)
 */
export default function useSetInterval(fn, delay) {
  useEffect(() => {
    const interval = setInterval(fn, delay);

    return () => clearInterval(interval);
  }, [fn, delay]);
}
