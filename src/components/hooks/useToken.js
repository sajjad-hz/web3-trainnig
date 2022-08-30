import { useEffect } from "react";
import { getErc20Contract } from "../utils/getContract";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "ethers/lib/utils";
import { rpcProviderTest } from "../utils/rpcProvider";

export default function useToken(tokenAddress, setTokensInfo, setLoading) {
  const { chainId, account, library } = useWeb3React();

  
  console.log('library', library)

  useEffect(() => {
    let datas = [];
    const getTokensInfo = async () => {
      try {
        const contract = getErc20Contract(tokenAddress, library ?? rpcProviderTest);
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const name = await contract.name();

        if (account) {
          const balance = await contract.balanceOf(account);
          datas = {
            address: tokenAddress,
            symbol,
            decimals,
            name,
            balance: formatUnits(balance.toString(), decimals).toString(),
          };
        } else {
          datas = { address: tokenAddress, symbol, decimals, name };
        }
      } catch (error) {
        console.log("error", error);
      }
      setLoading(true);
      setLoading(false);
      setTokensInfo(datas);
    };

    tokenAddress && getTokensInfo();
  }, [account, chainId, tokenAddress]);
}
