import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, ButtonGroup } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";

const CONTRACT_ADDRESS = "0x21A51805A7f47AB2261809E93F4617B68234CdF1";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  purchased: {
    filter: `grayscale('100%')`
  },
  mainImg: {
    width: "100%",
    maxWidth: "500px"
  }
}));

function PuppeePicker() {

  const classes = useStyles();

  const web3React = useWeb3React();

  const [mintedToken, setMintedToken] = useState(false);
  const [tokenId, setTokenId] = useState(0);
  const [tokenIdImg, setTokenIdImg] = useState(null);
  const [totalTokens, setTotalTokens] = useState(3125);

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
    let newId = generateRandomId();
    setTokenId(55555);
    setTokenIdImg(tokenImgURI(55555));
    setMintedToken(true);
  }

  function closeConnection() {
    web3React.deactivate();
    setTokenId(0);
  }

  async function checkToken(tokenId) {
    tokenContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, web3React.library);
    tokenId = tokenId || 0;
    setMintedToken(await tokenContract.tokenMinted(parseInt(tokenId)));
    getTotalTokens();
  }

  async function getTotalTokens() {
    tokenContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, web3React.library);
    setTotalTokens((await tokenContract.totalTokens()).toNumber());
  }

  function generateRandomId() {
    let randomTokenID = 0;

    while (!validId(randomTokenID))
      randomTokenID = Math.floor(Math.random() * (55555 - 11111) + 11111);

    return randomTokenID;
  }

  function generateRandom() {
    updateImage(generateRandomId());
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
      console.log(err);
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
    <>
      <Grid item xs={8}>
        {walletConnected() && validId(tokenId) &&
        <img
          src={tokenIdImg}
          alt={"Puppee " + tokenId}
          className={classes.mainImg} />
        }
        {walletConnected() && !validId(tokenId) &&
        <p>Please enter a Puppee ID</p>
        }
        {!walletConnected() &&
        <img
          src={tokenImgURI(55555)}
          alt={"Puppee 55555"}
          className={classes.mainImg} />
        }
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center">
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
              <ButtonGroup>
                <Button
                  variant="outlined"
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
                  {mintedToken ? 'Sold!' : 'Mint!'}
                </Button>

              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
            <Button
                  variant="contained"
                  color="secondary"
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
      </Grid>
    </>
  );
}

export default PuppeePicker;
