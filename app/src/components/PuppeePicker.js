import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Container } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";

const CONTRACT_ADDRESS = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  purchased: {
    filter: `grayscale('100%')`
  }
}));

function PuppeePicker() {

  const classes = useStyles();

  const web3React = useWeb3React();

  const [mintedToken, setMintedToken] = useState(false);
  const [tokenId, setTokenId] = useState(0);
  const [tokenIdImg, setTokenIdImg] = useState(null);
  const handleSubmit = (e) => {
      e.preventDefault();
  }

  let signer;
  let tokenContract;

  function walletConnected() {
    return web3React.account && web3React.connector instanceof InjectedConnector;
  }

  function initConnection() {
    web3React.activate(injected);
  }

  function closeConnection() {
    web3React.deactivate();
  }

  async function checkToken(tokenId) {
    tokenContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, web3React.library);
    console.log(await tokenContract.tokenMinted(tokenId))
    setMintedToken(await tokenContract.tokenMinted(tokenId));
  }

  function generateRandom() {
    let randomTokenID = 0;

    while (!validId(randomTokenID))
      randomTokenID = Math.floor(Math.random() * (55555 - 11111) + 11111);

    updateImage(randomTokenID);
  }

  async function updateImage(theTokenId) {
    setTokenId(theTokenId);
    setTokenIdImg(`/collection/${theTokenId}.jpg`);
    await checkToken(theTokenId);
  }

  function handleMint() {
    mint();
  }

  async function mint() {
    signer = web3React.library.getSigner(web3React.account);
    tokenContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, signer);
    try {
      let payment = ethers.utils.parseEther(".015");
      let overrides = {
        value: payment
      };
      const transaction = await tokenContract.publicMint(tokenId, overrides);
      await transaction.wait();
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  function validId(tokenId) {
    return tokenId >= 11111 && tokenId <= 55555
      && tokenId % 10 > 0 && tokenId % 10 <= 5
      && tokenId % 100 > 10 && tokenId % 100 <= 55
      && tokenId % 1000 > 100 && tokenId % 1000 <= 555
      && tokenId % 10000 > 1000 && tokenId % 10000 <= 5555;
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <img src="puppeeth.png" width="100%" alt="puppeeth" />
              <p>An NFT avatar art collection</p>
            </Grid>


          </Grid>

          {walletConnected() && <>
          <Grid item xs={12}>
            <TextField
              required
              value={tokenId}
              label={!walletConnected() ? "Please connect a wallet" : "Token ID"}
              onChange={e => updateImage(e.target.value)}
              disabled={!walletConnected()}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={generateRandom}
            >
              Random 🐶
            </Button>
            <Button
              variant="contained"
              disabled={!validId(tokenId) || mintedToken}
              color="primary"
              onClick={handleMint}
            >
              {mintedToken ? 'Sold!' : 'Buy!'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={closeConnection}
            >
              Disconnect
            </Button>






            </Grid>
            </>}
            {!walletConnected() && <>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={initConnection}
              >
                Connect Wallet
              </Button>
            </Grid>
            </>}
        </Grid>
        <Grid item xs={6}>
          <img src={tokenIdImg} className={mintedToken ? classes.purchased : null} width="100%" />
        </Grid>
      </Grid>

      <p>token Id: {tokenId}</p>
      <p>token minted: {mintedToken ? 'Yes' : 'No'}</p>

    </Container>

  );
}

export default PuppeePicker;
