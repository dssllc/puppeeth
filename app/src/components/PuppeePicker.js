import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Container } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";

const CONTRACT_ADDRESS = "0x5DB2C7cCD6bc00F394068A24D00b18736dcFCD98";

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

  let signer;
  let tokenContract;

  function tokenImgURI(theTokenId) {
    return `https://gateway.pinata.cloud/ipfs/QmVRR9fAhnxkZShMDVnipBNK9TNSqXysvKdYZ2Usz4HMQ8/${theTokenId}.jpg`;
  };

  function walletConnected() {
    return web3React.account && web3React.connector instanceof InjectedConnector;
  }

  async function initConnection() {
    await web3React.activate(injected);
    setTokenId(55555);
    setTokenIdImg(tokenImgURI(55555));
    setMintedToken(true);
  }

  async function closeConnection() {
    await web3React.deactivate();
    setTokenId(0);
  }

  async function checkToken(tokenId) {
    tokenContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, web3React.library);
    setMintedToken(await tokenContract.tokenMinted(parseInt(tokenId)));
  }

  function generateRandom() {
    let randomTokenID = 0;

    while (!validId(randomTokenID))
      randomTokenID = Math.floor(Math.random() * (55555 - 11111) + 11111);

    updateImage(randomTokenID);
  }

  async function updateImage(theTokenId) {
    setTokenId(theTokenId);
    setTokenIdImg(tokenImgURI(theTokenId));
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
      const transaction = await tokenContract.mint(tokenId, overrides);
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
              label={!walletConnected() ? "Please connect a wallet" : "Puppee ID"}
              onChange={e => updateImage(e.target.value)}
              disabled={!walletConnected()}
              inputProps={{ maxLength: 5 }}
              error={!validId(tokenId)}
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
          {walletConnected() && validId(tokenId) &&
          <img
            src={tokenIdImg}
            alt={"Puppee " + tokenId}
            className={mintedToken ? classes.purchased : null} width="100%" />
          }
          {walletConnected() && !validId(tokenId) &&
          <p>Please enter a Puppee ID</p>
          }
          {!walletConnected() &&
          <img
            src={tokenImgURI(55555)}
            alt={"Puppee 55555"}
            width="100%" />
          }
        </Grid>
      </Grid>

      <p>token Id: {tokenId}</p>
      <p>token minted: {mintedToken ? 'Yes' : 'No'}</p>

    </Container>

  );
}

export default PuppeePicker;
