import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  TextField,
  Button,
  ButtonGroup,
  Typography,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";
import { CONTRACT_ADDRESS, RPC_ENDPOINT } from "../constants";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px"
  },
  mainImg: {
    width: "100%",
    maxWidth: "400px",
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
    borderStyle: "solid"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

function PuppeePicker(props) {

  const backdropMsgDefault = "Check your wallet...";

  const { tokenId, tokenHandler, totalTokens } = props;

  const classes = useStyles();

  const web3React = useWeb3React();

  useEffect(() => {
    if (validId(tokenId)) {
      setTokenIdImg(tokenImgURI(tokenId));
    }
  }, [tokenId]);

  const [mintedToken, setMintedToken] = useState(false);
  const [tokenIdImg, setTokenIdImg] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [backdropMsg, setBackdropMsg] = useState(backdropMsgDefault);

  let signer;
  let tokenContract;

  function tokenImgURI(theTokenId) {
    return `https://gateway.pinata.cloud/ipfs/QmVRR9fAhnxkZShMDVnipBNK9TNSqXysvKdYZ2Usz4HMQ8/${theTokenId}.jpg`;
  };

  function walletConnected() {
    return web3React.active;
  }

  async function initConnection() {
    await web3React.activate(injected);
    if (!tokenId) {
      let newId = generateRandomId();
      tokenHandler(newId);
      setTokenIdImg(tokenImgURI(newId));
    }
    await checkToken(tokenId);
  }

  function closeConnection() {
    web3React.deactivate();
  }

  async function checkToken(tokenId) {
    tokenContract = tokenContract || new ethers.Contract(
      CONTRACT_ADDRESS,
      Puppeeth.abi,
      ethers.getDefaultProvider(RPC_ENDPOINT)
    );
    tokenId = tokenId || 0;
    setMintedToken(await tokenContract.tokenMinted(parseInt(tokenId)));
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
    tokenHandler(theTokenId);
    if (validId(theTokenId)) {
      setTokenIdImg(tokenImgURI(theTokenId));
    }
    await checkToken(theTokenId);
  }

  function handleMint() {
    mint();
  }

  async function mint() {
    setOpenBackdrop(true);
    signer = web3React.library.getSigner(web3React.account);
    tokenContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, signer);
    try {
      let payment = ethers.utils.parseEther(".015");
      let overrides = {
        value: payment
      };
      const transaction = await tokenContract.mint(tokenId, overrides);
      setBackdropMsg("Minting your 🐶");
      await transaction.wait();
      setOpenBackdrop(false);
      setBackdropMsg(backdropMsgDefault);
      checkToken(tokenId);
    } catch (err) {
      setOpenBackdrop(false);
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
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <Grid container spacing={3}>
          <Grid container item xs={12} justifyContent="center">
            <CircularProgress color="inherit" />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Typography component="p">
              {backdropMsg}
            </Typography>
          </Grid>
        </Grid>
      </Backdrop>

      <Container className={classes.root} align="center">

        <Grid container>
          <Grid item xs={6} sm={6} md={6}>
            <Typography variant="body1" align="left">🐶 {(3125 - totalTokens) || "--"} left</Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Typography variant="body1" align="right">💰<strong>0.015ETH</strong></Typography>
          </Grid>
        </Grid>

        {tokenId !== 0 &&
        <img
          src={tokenIdImg}
          alt={"Puppee " + tokenId}
          className={classes.mainImg} />
        }
        {tokenId === 0 &&
        <img
          src="/puppees-2x2.jpg"
          alt={"Puppee Collection"}
          className={classes.mainImg} />
        }
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center">
          {tokenId !== 0 && <>
            <Grid item xs={12}>
              <TextField
                required
                value={tokenId}
                label="Puppee ID"
                onChange={e => updateImage(e.target.value)}
                inputProps={{ maxLength: 5, style: { textAlign: 'center', fontSize: 24 } }}
                error={!validId(tokenId)}
                helperText="Only five (5) numbers, one through five (1-5)"
                maxLength={5}
                fullWidth
              />
            </Grid>
          </>}
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
                disabled={!walletConnected() || !validId(tokenId) || mintedToken}
                color="primary"
                onClick={handleMint}
              >
                {mintedToken ? "Sold!" : "Mint!"}
              </Button>

            </ButtonGroup>
          </Grid>
          {walletConnected() && <>
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
      </Container>
    </>
  );
}

export default PuppeePicker;
