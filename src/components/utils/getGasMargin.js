import { BigNumber } from "ethers";

export function calculateGasMargin(value) {
    return value
      .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
      .div(BigNumber.from(10000));
  }