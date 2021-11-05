import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { CssBaseline } from "@material-ui/core";
import PuppeePicker from './components/PuppeePicker';
import { ThemeProvider, createTheme } from "@material-ui/core/styles"

const themeLight = createTheme({
  palette: {
    background: {
      default: "#fff"
    }
  }
});

function App() {

  function getLibrary(provider) {
    return new ethers.providers.Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <PuppeePicker />
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
