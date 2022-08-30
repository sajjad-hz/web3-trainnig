import { useRef, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { rpcProviderMain } from "../utils/rpcProvider";

export function useActiveWeb3react() {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || rpcProviderMain);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || rpcProviderMain);
      refEth.current = library;
    }
  }, [library]);

  return {
    ...web3React,
    library: provider,
    chainId,
  };
}
