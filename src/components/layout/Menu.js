import { Menu } from 'antd';
import {  DoubleRightOutlined, UnorderedListOutlined, LockOutlined } from '@ant-design/icons';
import Landing from '../Landing';

const App = (props) => {
  const { handleClick } = props;

  return (
  <Menu mode="horizontal" defaultSelectedKeys={['1']} theme='dark'>
    <Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={handleClick}>
      Tokens List
    </Menu.Item>
    <Menu.Item key="2" icon={<DoubleRightOutlined />} onClick={handleClick}>
      MultiSender
    </Menu.Item>
    <Menu.Item key="3" icon={<LockOutlined />} onClick={handleClick}>
      Lock Token
    </Menu.Item>
  </Menu>
)}

export default App;