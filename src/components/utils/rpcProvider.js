import { ethers } from "ethers";

const RPC_URL_MAIN = "https://bsc-dataseed.binance.org/";
const RPC_URL_TEST = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

export const rpcProviderMain = new ethers.providers.JsonRpcProvider(RPC_URL_MAIN);
export const rpcProviderTest = new ethers.providers.JsonRpcProvider(RPC_URL_TEST);
