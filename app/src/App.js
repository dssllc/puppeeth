import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { CssBaseline } from "@material-ui/core";
import PuppeePicker from './components/PuppeePicker';

function App() {

  function getLibrary(provider) {
    return new ethers.providers.Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <CssBaseline />
      <PuppeePicker />
    </Web3ReactProvider>
  );
}

export default App;
