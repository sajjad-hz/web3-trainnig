import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { rpcProviderMain } from "./rpcProvider";
import erc20Abi from "../../config/abi/erc20.json";

export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

const getContract = ( address, abi, signer = rpcProviderMain) => {
  return new ethers.Contract(address, abi, signer);
};


export const getErc20Contract = (address, signer ) => {
  if (!isAddress(address)) {
    throw Error(`Invalid address '${address}'.`)
  }
  return getContract(address, erc20Abi, signer  );
};

