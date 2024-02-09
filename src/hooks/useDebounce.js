import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedval, setDebouncedval] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedval(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedval;
};
