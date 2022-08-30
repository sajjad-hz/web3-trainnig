import { Button, Form, Input, Space } from "antd";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import React from "react";
import { useState } from "react";
import getTokensList from "../config/constant/tokensList";
import { useActiveWeb3react } from "./hooks/useActiveWeb3react";
import { useTokenLockerContact } from "./hooks/useContract";
import useToken from "./hooks/useToken";
import MyNotif from "./notification";
import { isAddress } from "./utils/getContract";
import { calculateGasMargin } from "./utils/getGasMargin";
import { sendTransaction } from "./utils/tsns";

const LockToken = () => {
  const { account, library } = useActiveWeb3react();
  const [tokenInput, setTokenInput] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState('');
  const [tokenInfo, setTokenInfo] = useState({});
  const [loading, setLoading] = useState(false);
  //   const tokenAddress = "0xBFD2412B0f2dA8e84344b8095ad932D24Ba5252d";
  //   const amount = parseUnits("20", "9");
  console.log("amount", amount.toString());

  const lockerContract = useTokenLockerContact(
    getTokensList("lock")[0].address
  );
  console.log("lockerContract", lockerContract);

  useToken(tokenAddress, setTokenInfo, setLoading);
    console.log("tokenInfo", tokenInfo);

  const tokenInputHandler = (e) => {
    setTokenInput(e.target.value);
    if (isAddress(e.target.value)) {
      setTokenAddress(e.target.value);
    }
  };

  const inputAmountHandler = (e) => {
    setAmount(e.target.value)   
  }

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    if (!tokenAddress) {
      MyNotif("error", "Wrong Data", "Token address is required");
    } else if (+amount > +tokenInfo?.balance) {
      MyNotif("error", "Wrong Data", "Not Enough Balance");
    }
    else {
        lockTokenHandler()
    }
  };

  const lockTokenHandler = () => {
    const lockParams = {
      owner: account,
      amount: parseUnits(amount.toString() , tokenInfo?.decimals),
      startEmission: 0,
      endEmission: 1659005900,
      condition: "0x0000000000000000000000000000000000000000",
    };

    const args = [tokenAddress, [lockParams]];
    const method = 'lock'

    // lockerContract.estimateGas
    //   .lock(...args)
    //   .then((estimatedGas) => {
    //     lockerContract
    //       .lock(...args, { gasLimit: calculateGasMargin(estimatedGas) })
    //       .then((receipt) => {
    //         console.log("receipt", receipt);
    //         library.waitForTransaction(receipt.hash).then((res) => {
    //           console.log("res", res);
    //           MyNotif("success", "Success", "Token locked successfully");
    //         }
    //         );
    //       })
    //       .catch((error) => {
    //         console.log("error", error);
    //         MyNotif("error", "Error", "Error locking token");
    //       });
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     MyNotif("error", "Error", "Error estimate locking token");
    //   });

    sendTransaction(lockerContract,method,args)
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Space>
        <Input.Group style={{width:500}}>
        <Form.Item>
          <Input
            style={{ marginBottom: "24px" }}
            placeholder="Token Address"
            value={tokenInput}
            onChange={tokenInputHandler}
            status={isAddress(tokenInput) ? "success" : "error"}
            onPressEnter={tokenInputHandler}
            required={true}
          />
          <span>Balance: {tokenInfo?.balance}</span>
          </Form.Item>
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={inputAmountHandler}
            onPressEnter={tokenInputHandler}
            required= {true}
          />
        </Input.Group>
        <Button type="primary" htmlType="submit" style={{ marginLeft: "24px" }}>
          Lock Token
        </Button>
      </Space>
    </Form>
  );
};

export default LockToken;
