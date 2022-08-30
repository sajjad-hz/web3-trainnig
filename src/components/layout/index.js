import { useState } from 'react';
import { Layout } from 'antd';
import Landing from '../Landing';
import Menu from './Menu';
import ConnectButton2 from '../ConnectButton2';
import FormInput from '../FormInput';
import LockToken from '../LockToken';


const { Header, Content, Footer } = Layout;


const MyLayout = () => {

  const components = {
    1: <div><Landing/></div>,
    2: <div><FormInput/></div>,
    3: <div><LockToken/></div>,
  }

  const [render, updateRender] = useState(1);

  const handleMenuClick = menu => {
    updateRender(menu.key);
  };

  return (
  <Layout className="layout"  style={{ minHeight: "100vh"}}>
    <Header>
      <Menu handleClick={handleMenuClick}/>
    </Header>
    <ConnectButton2 />

    <Content
      style={{
        padding: '0 50px',
      }}
    >
      {components[render]}
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      ©Sajjad 
    </Footer>
  </Layout>
  
)}

export default MyLayout;