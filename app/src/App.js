import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { CssBaseline, makeStyles, Typography, Container, Grid, Link } from "@material-ui/core";
import PuppeePicker from './components/PuppeePicker';
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
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
  hidden: {
    display: "none"
  },
  logo: {
    width: "100%",
    maxWidth: "500px",
  },
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
        <Container>
          <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
              <img src="puppeeth.png" alt="puppeeth" className={classes.logo} />
              <Typography component="h1" align="center" className={classes.hidden}>
                puppeeth
              </Typography>
              <Typography variant="body2" align="center">
                A simple NFT avatar collection made with ❤️ and 🐶
              </Typography>
            </Grid>

            <PuppeePicker />

            <Copyright />
          </Grid>
        </Container>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;
