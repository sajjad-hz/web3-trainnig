import { useEffect, useState } from "react";
import { useActiveWeb3react } from "./useActiveWeb3react";
import { injected } from "../connectors";

export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useActiveWeb3react();
  
    useEffect(() => {
      const { ethereum } = window;
      if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleChainChanged = (chainId) => {
          console.log("chainChanged", chainId);
          activate(injected);
        };
  
        const handleAccountsChanged = (accounts) => {
          console.log("accountsChanged", accounts);
          if (accounts.length > 0) {
            activate(injected);
          }
        };
  
        const handleNetworkChanged = (networkId) => {
          console.log("networkChanged", networkId);
          activate(injected);
        };
  
        ethereum.on("chainChanged", handleChainChanged);
        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("networkChanged", handleNetworkChanged);
  
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener("chainChanged", handleChainChanged);
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
            ethereum.removeListener("networkChanged", handleNetworkChanged);
          }
        };
      }
  
      return () => {};
    }, [active, error, suppress, activate]);
  }
  