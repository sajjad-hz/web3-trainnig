import { Contract } from "ethers";
import { useActiveWeb3react } from "./useActiveWeb3react";
import MultisenderAbi from "../../config/abi/multisenderAbi.json";
import TokenLockerAbi from '../../config/abi/locker.json';
import ERC20_ABI from "../../config/abi/erc20.json";
import { rpcProviderMain, rpcProviderTest } from "../utils/rpcProvider";
import { getProviderOrSigner } from "../utils/getSigner";

export const useContract = (tokenAddress, ABI) => {
  const { library, account } = useActiveWeb3react();
    if (!tokenAddress || !ABI || !library) return null
    try {
      const contarct = new Contract(
        tokenAddress,
        ABI,
        getProviderOrSigner(library, account)
          ? getProviderOrSigner(library, account)
          : rpcProviderTest
      );
      return contarct;
    } catch (error) {
      console.log(error);
    }
};

export function useMultiSenderContact(address) {
    return useContract(address, MultisenderAbi);
  }

export function useTokenLockerContact(address) {
    return useContract(address, TokenLockerAbi);
  }

export const useTokenContract = (tokenAddress) => {
    return useContract(tokenAddress, ERC20_ABI)
}