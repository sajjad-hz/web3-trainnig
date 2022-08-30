import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

const useWaiter = (withError = true) => {
  const { library, account } = useWeb3React;

  return useCallback(
    async (hash) => {
      if (!library || !account || !hash) return false;

      try {
        const result = await library.waitForTransaction(hash);
        
        return {
          error: false,
          result,
        };
      } catch (e) {
        if (withError) 
          return {
            error: true,
            result: null,
          };
      }
    },
    [library, account]
  );
};
