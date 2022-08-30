import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { getErc20Contract } from "../utils/getContract";
import { rpcProvider } from "../utils/rpcProvider";
import { useActiveWeb3react } from "./useActiveWeb3react";

const useTokenBalance = (tokenAddress) => {
  const [balance, setBalance] = useState(0);
  const { account, library } = useActiveWeb3react();


  useEffect(() => {
    const fetchData = async () => {
      const contract = getErc20Contract(tokenAddress);
      console.log('contract', contract)

      try {
        const bal = await contract.balanceOf(account);
        console.log("bal", bal);
      } catch (error) {
        console.log(error);
        setBalance(0);
      }
    };
    account && tokenAddress && fetchData();
  }, [tokenAddress, account]);

  return balance;
};

export default useTokenBalance;
