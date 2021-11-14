import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import {
  CssBaseline,
  makeStyles,
  Container,
  Grid
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import About from './components/About';
import PuppeePicker from './components/PuppeePicker';
import Copyright from './components/Copyright';

const themeLight = createTheme({
  palette: {
    background: {
      default: "#fff"
    },
    primary: {
      main: "#4012F7"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  copyright: {
    paddingTop: "15px"
  }
}));

function App() {

  const classes = useStyles();

  function getLibrary(provider) {
    return new ethers.providers.Web3Provider(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={themeLight}>
        <CssBaseline />
        <TopBar />
        <Hero />
        <Container>
          <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}>

            <PuppeePicker />

            <About />

            <Copyright />
          </Grid>
        </Container>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
