import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 400ms)
 * @returns {T} - The debounced value
 */
const useDebounce = <T>(value: T, delay: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
