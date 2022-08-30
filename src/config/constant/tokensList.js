import tokensListJson from "./tokenlist.json";

export default function getTokensList (chainId = 56) {
  let tokensList = [];
  tokensListJson?.[chainId]?.map((item) => {
    tokensList = [...tokensList, item];
  });
    return tokensList;
};

