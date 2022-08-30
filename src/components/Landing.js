import React, {useState} from "react";
import ConnectButton2 from "./ConnectButton2";
import DataTable from "./DataTable";
import useRpcTokensInfo from "./hooks/useRpcTokensInfo";
import {Layout} from "antd";
import getTokensList from "../config/constant/tokensList";
import { UseMultiSender, useTokenContract } from "./hooks/useContract";
import useTokenAllowance from "./hooks/useTokenAllowance";
import { useActiveWeb3react } from "./hooks/useActiveWeb3react";
// import MultiSend from "./useMultiSend";
import FormInput from './FormInput';

const Landing = () => {
  const [tokensInfo, setTokensInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  useRpcTokensInfo(setTokensInfo, setLoading);

  const { Content } = Layout;






  return (
    <Content>
      <DataTable data={tokensInfo} loading={loading} />
    </Content>
  );
};

export default Landing;
