import { useEffect } from "react";
import getTokensList from "../../config/constant/tokensList";
import { getErc20Contract } from "../utils/getContract";
import { useWeb3React } from "@web3-react/core";
import { parseUnits, formatUnits } from "ethers/lib/utils";
import { rpcProvider } from "../utils/rpcProvider";

export default function useRpcTokensInfo(setTokensInfo, setLoading) {
  const { active, chainId, account, library, connector, activate, deactivate } =
    useWeb3React();

  useEffect(() => {
    setLoading(true);

    const tokensList = getTokensList(chainId);
    let datas = [];
    const getTokensInfo = async () => {
      const list = tokensList.map(async (token, ind) => {
        try {
          const contract = getErc20Contract(token.address, library);
          const symbol = await contract.symbol();
          const decimals = await contract.decimals();
          const name = await contract.name();

          if (account) {
            const balance = await contract.balanceOf(account);
            datas = [
              ...datas,
              {
                address: token.address,
                symbol,
                decimals,
                name,
                balance : formatUnits(balance.toString(), decimals).toString(),
                key: ind,
              },
            ];
          } else {
            datas = [
              ...datas,
              { address: token.address, symbol, decimals, name, key: ind },
            ];
          }
        } catch (error) {
          console.log("error", error);
        }
      });
      return Promise.all(list).then(() => {
        setLoading(false);
        setTokensInfo(datas);
        console.log('datas', datas)
      });
    };

    getTokensInfo();
  }, [account, chainId]);
}
