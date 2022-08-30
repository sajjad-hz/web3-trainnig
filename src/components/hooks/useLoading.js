import { useState, useCallback, useMemo } from "react";

export const useLoading = (withError = true) => {
  const [loading, setLoading] = useState(false);

  const callBack = useCallback(
    async (func, args = {}) => {
      try {
        setLoading(true);
        const res = await func(...args);
        setLoading(false);

        return res;
      } catch (e) {
        setLoading(false);

        if (withError)
          return {
            error: e,
            completed: false,
          };
      }
    },
    [withError, setLoading]
  );

  useMemo(() => [loading, callBack], [loading, callBack]);
};
