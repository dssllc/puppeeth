
import {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Container } from '@material-ui/core';

import Copyright from "./components/Copyright";

import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function App() {

  const classes = useStyles();

  const [tokenId, setTokenId] = useState(null);
  const [tokenIdImg, setTokenIdImg] = useState(null);
  const handleSubmit = (e) => {
      e.preventDefault();
      setTokenIdImg(`https://gateway.pinata.cloud/ipfs/QmS4rYwcQtMeWDmzkR7T3aa6Go1ookuUYGdRW98rk3LG1u/${tokenId}.jpg`)
  }

  const walletConnected = () => {
    return true;
  };

  const generateRandom = () => {
    let randomTokenID = 0;

    while (!validId(randomTokenID))
      randomTokenID = Math.floor(Math.random() * (55555 - 11111) + 11111);
    
    setTokenId(randomTokenID);
  };

  const validId = (tokenId) => {
    return tokenId >= 11111 && tokenId <= 55555
      && tokenId % 10 > 0 && tokenId % 10 <= 5
      && tokenId % 100 > 10 && tokenId % 100 <= 55
      && tokenId % 1000 > 100 && tokenId % 1000 <= 555
      && tokenId % 10000 > 1000 && tokenId % 10000 <= 5555;
  };

  return (
    <Container>
      <header className="App-header">
        <img src="puppeeth.png" className="App-logo" alt="puppeeth" />
        <p>An NFT avatar art collection</p>
      </header>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            value={tokenId}
            label={!walletConnected() ? 'Please connect a wallet' : 'Token ID'}
            onChange={e => setTokenId(e.target.value)}
            fullWidth
            disabled={!walletConnected()}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            disabled={!walletConnected()}
            color="primary"
            id="submit button"
            data-testid="step-one-button"
            onClick={generateRandom}
          >
            Generate Random
          </Button>
          <Button
            variant="contained"
            disabled={!tokenId || !walletConnected()}
            color="primary"
            id="submit button"
            data-testid="step-one-button"
            onClick={handleSubmit}
          >
            Buy!
          </Button>
        </Grid>
        <Grid item xs={12}>
          <img src={tokenIdImg} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
