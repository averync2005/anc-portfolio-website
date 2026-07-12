import { useCallback, useRef } from "react";

export const useThrottle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T => {
  const lastFunc = useRef<ReturnType<typeof setTimeout>>();
  const lastRan = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      if (!lastRan.current) {
        func(...args);
        lastRan.current = Date.now();
      } else {
        // Schedule a trailing call so the final event in a burst still fires.
        clearTimeout(lastFunc.current);
        lastFunc.current = setTimeout(() => {
          if (Date.now() - lastRan.current >= limit) {
            func(...args);
            lastRan.current = Date.now();
          }
        }, limit - (Date.now() - lastRan.current));
      }
    },
    [func, limit]
  ) as T;
};
