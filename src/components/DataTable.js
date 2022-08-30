import { Table, Spin, Layout, Image } from "antd";
import { useActiveWeb3react } from "./hooks/useActiveWeb3react";

const columns = [
  {
    title: "Logo",
    key: "logo",
    render: (text, record) => (
      <>
        <Image
          width={24}
          src={`https://assets.trustwalletapp.com/blockchains/smartchain/assets/${record.address}/logo.png`}
        />
      </>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },

  {
    title: "Decimals",
    dataIndex: "decimals",
    key: "decimals",
  },
  {
    title: "Address",
    key: "address",
    render: (text, record) => (
      <>
        <a
          href={`https://bscscan.com/address/${record.address}`}
          target="blank"
        >
          {record.address}
        </a>
      </>
    ),
  },
];

const { Content } = Layout;

const DataTable = ({ data, loading }) => {
  const { account } = useActiveWeb3react();

  return (
    <>
      {loading ? (
        <Content
          style={{
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Content>
      ) : (
        <Table
          columns={
            account
              ? [...columns,{title: "Balance",key: "balance",dataIndex: "balance"}]
              : columns
          }
          dataSource={data}
        />
      )}
    </>
  );
};

export default DataTable;
