import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./connectors";
import { Button, Space } from "antd";
import { useActiveWeb3react } from "./hooks/useActiveWeb3react";
import { useEagerConnect } from "./hooks/useEagerConnect";
import { useInactiveListener } from "./hooks/useInactiveListener";

const ConnectButton2 = () => {
  const { account, connector, library, active, activate, deactivate } =
    useActiveWeb3react();
  // const { active, account, chainId, connector, activate, deactivate } = useWeb3React()
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  async function connect() {
    try {
      await activate(injected);
    } catch (error) {
      console.error(error);
    }
  }

  function disconnect() {
    try {
      deactivate();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Space style={{margin: 50}}>
      <Button
        type="primary"
        ghost
        onClick={active ? disconnect : connect}
        style={{ marginBottom: 24 }}
      >
        {active ? "Disconnect" : "Connect"}
      </Button>
      {active && <div style={{ height: 45 }}>{account}</div>}
    </Space>
  );
};

export default ConnectButton2;
