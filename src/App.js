import "./App.css";
import 'antd/dist/antd.css'
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import MyLayout from "./components/layout";
import Landing from "./components/Landing";

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

function App() {
  return (

    <Web3ReactProvider getLibrary={getLibrary} >
      <MyLayout MyComponent={Landing}/>
      {/* <Landing/> */}
    </Web3ReactProvider>
  );
}

export default App;
