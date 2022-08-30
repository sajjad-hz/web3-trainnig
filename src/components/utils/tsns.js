import { ethers, PayableOverrides } from "ethers";
import { calculateGasMargin } from "./getGasMargin";
import { BigNumber } from "@ethersproject/bignumber";

export const estimateGas = async (
    contract,
    method,
    args = [],
    overrideParams = {},
    withSafetyMargin = true,
    withErrorHandler = true,
) => {
    if(!contract) return BigNumber.from('0');

  const estimation = contract.estimateGas[method]
  try {
    const estimatedGas = await estimation(...args, {
      ...overrideParams
    });

    if(withSafetyMargin) return calculateGasMargin(estimatedGas);
    return estimatedGas;
  } catch(e) {
    if(withErrorHandler) return console.log('error');
    return BigNumber.from('0')
  }
}

export const callMethod = async (
    contract,
    method,
    args,
  ) => {
    try {
      return await contract[method](...args);
    } catch (e) {
      return console.log(e);
    }
  }

  export const sendTransaction = async (
    contract,
    methodName,
    args = [],
    overrideParams = {},
    onError,
    onSuccess,
  ) => {
    try {
      const estimatedGas = await estimateGas(contract, methodName, args, overrideParams, true, true);
      const method = contract[methodName]
  
      try {
        const res = await method(...args, {
          ...overrideParams,
          gasLimit: estimatedGas
        })
  
        if(onSuccess) return await onSuccess(res)
        return true;
      } catch (err) {
        if(onError) return await onError(err);
        return false;
      }
    } catch (err) {
      if(onError) onError(err);
      return false;
    }
  }


