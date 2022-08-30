import React, {  useState } from "react";
import { Form, Input, Button, Space,  Spin } from "antd";
import { MinusCircleOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { isAddress } from "./utils/getContract";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import useToken from "./hooks/useToken";
import { useActiveWeb3react } from "./hooks/useActiveWeb3react";
import getTokensList from "../config/constant/tokensList";
import { useMultiSenderContact, useTokenContract } from "./hooks/useContract";
import { calculateGasMargin } from "./utils/getGasMargin";
import MyNotif from "./notification";
import { sendTransaction } from "./utils/tsns";


const FormInput = () => {
  // const [wallets, setWallets] = useState([]);
  // const [amounts, setAmounts] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [tokenInfo, setTokenInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const { account, library, chainId } = useActiveWeb3react();
  const multisenderAddress = getTokensList("multisender")[0].address;

  const mulContract = useMultiSenderContact(multisenderAddress);
  const tokenContract = useTokenContract(tokenAddress);
  console.log("mulContract", mulContract);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
    const addressArr = []
    const amountsArr = []
    values?.recievers?.map((item) => {
      const { wallet, amount } = item;
      addressArr.push(wallet);
      amountsArr.push(parseUnits(amount.toString(), tokenInfo.decimals)).toString();
      setTotalAmounts((state) => +state + +amount);
    });
    // setWallets(addressArr);
    // setAmounts(amountsArr);

    if (addressArr?.length > 1 && amountsArr?.length > 1) {
      allowanceHandler(addressArr, amountsArr);
    } else if (addressArr?.length < 2 && amountsArr?.length < 2 && tokenAddress) {
      MyNotif('error','Wrong Data', 'At least two recievers required')
    }

  };

  useToken(tokenAddress, setTokenInfo, setLoading);
  console.log("tokenInfo", tokenInfo);

  const tokenInputHandler = (e) => {
    setTokenInput(e.target.value);
    if (isAddress(e.target.value)) {
      setTokenAddress(e.target.value);
    }
  };

  const allowanceHandler = async (wallets, amounts) => {
    const allowance = await tokenContract.allowance(
      account,
      multisenderAddress
    );

    console.log("allowance", allowance);
    if (BigNumber.from(allowance).lt(BigNumber.from(totalAmounts))) {
      const res = await tokenContract.approve(multisenderAddress, totalAmounts);
    } else {
      mulContractHandler(wallets, amounts);
    }
  };

  const getCurrentFees = async () => {
    try {
      if (!account || !chainId || !library || !mulContract) return false;

      return await mulContract.currentFee(account);
    } catch (e) {
      console.log(e, "ERROR");
    }
  };

  const mulContractHandler = async (wallets, amounts) => {
    if (!account || !chainId || !library || !mulContract) return false;
    setLoading(true);
    const args = [
      tokenAddress,
      wallets.map((addr) => addr),
      amounts.map((amount) =>  amount.toString()),
    ];
    
    const fees = await getCurrentFees();
    const method = "multisendToken";
    const estimation = mulContract.estimateGas[method];
    const overrideParams = { value: fees?.toString() };
    // estimation(...args, { ...overrideParams })
    //   .then((estimatedGas) => {
    //     mulContract[method](...args, {
    //       ...overrideParams,
    //       gasLimit: calculateGasMargin(estimatedGas),
    //     })
    //       .then((res) => {
    //         console.log('res multi ok', res)
    //         library.waitForTransaction(res.hash).then(() => {
    //           MyNotif('success','Success', 'Transaction Successful')
    //           setLoading(false);
    //           return true;
    //         }
    //         ).catch((err) => {
    //           console.log('err multi', err)
    //           MyNotif('error','Error', 'Transaction Failed')
    //           setLoading(false);
    //           return false;
    //         }
    //         )
            
    //       })
    //       .catch((err) => {
    //         console.log(err, "miltisend fail");
    //         MyNotif('error','Error', 'Transaction Failed')
    //         setLoading(false);

    //         return false;
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err, "miltisend fail");
    //     MyNotif('error','Error', 'Transaction Failed')
    //     setLoading(false);

    //     return false;
    //   });
    sendTransaction(mulContract,method,args,overrideParams)
  };
  // };

  const antIcon = <LoadingOutlined style={{ fontSize: 24, color:'white' }} spin />;

  return (
    <>
      <Input.Group style={{ marginBottom: "24px" }}>
        <Input
          placeholder="Token Address"
          style={{ width: "calc(85% - 200px)" }}
          value={tokenInput}
          onChange={tokenInputHandler}
          status={isAddress(tokenInput) ? "success" : "error"}
          onPressEnter={tokenInputHandler}
        />
      </Input.Group>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="recievers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    // marginBottom: 4,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    style={{ width: "400px" }}
                    {...restField}
                    name={[name, "wallet"]}
                    rules={[
                      {
                        required: true,
                        message: "Address is required",
                      },
                      {
                        validator: async (_, names) => {
                          if (!isAddress(names)) {
                            return Promise.reject(
                              new Error("Wrong wallet address")
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Wallet Address" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "amount"]}
                    rules={[
                      {
                        required: true,
                        message: "Amount is required",
                      },
                    ]}
                  >
                    <Input placeholder="Amount" type="number" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ width: "calc(85% - 200px)" }}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {loading ? <Spin indicator={antIcon}/> : 'Submit'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormInput;
