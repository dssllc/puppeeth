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
import { WalletConnectConnector, UserRejectedRequestError } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";
import Puppeeth
  from "../artifacts/contracts/Puppeeth.sol/Puppeeth.json";
import { CONTRACT_ADDRESS, RPC_ENDPOINT_1, RPC_ENDPOINT_4 } from "../constants";

const walletconnect = new WalletConnectConnector({
  infuraId: "326fc3cb09eb461cbc59967c20f36076",
  supportedChainIds: [1, 4, 1337],
  qrcode: true,
  pollingInterval: 12000,
  rpc: { 1: RPC_ENDPOINT_1, 4: RPC_ENDPOINT_4 },
});

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
  elips: {
    display: "inline-block",
    verticalAlign: "bottom",
    whiteSpace: "nowrap",
    width: "100%",
    maxWidth: "60px",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function PuppeePicker(props) {

  const {
    tokenId,
    tokenHandler,
    totalTokens,
    tokenContract,
    web3React
  } = props;

  const classes = useStyles();

  useEffect(() => {
    if (validId(tokenId)) {
      setTokenIdImg(tokenImgURI(tokenId));
    }
  }, [tokenId]);

  const [mintedToken, setMintedToken] = useState(false);
  const [tokenIdImg, setTokenIdImg] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  function tokenImgURI(theTokenId) {
    return `https://gateway.pinata.cloud/ipfs/QmVRR9fAhnxkZShMDVnipBNK9TNSqXysvKdYZ2Usz4HMQ8/${theTokenId}.jpg`;
  };

  function getFormattedWalletAddress() {
    let first = web3React.account.substring(0, web3React.account.length - 4);
    let last = web3React.account.substring(web3React.account.length - 4);
    return <>
      <span className={classes.elips}>{first}</span>{last}
    </>;
  }

  function walletConnected() {
    return web3React.active;
  }

  function handleError(error) {
    if (error instanceof UserRejectedRequestError) {
      walletconnect.close();
    }
  }

  function initConnection() {
    web3React.activate(walletconnect, handleError);
    tokenHandler(55555);
    setTokenIdImg(tokenImgURI(55555));
    setMintedToken(true);
  }

  function closeConnection() {
    web3React.deactivate();
    tokenHandler(0);
  }

  async function checkToken(tokenId) {
    if (walletConnected()) {
      tokenId = tokenId || 0;
      setMintedToken(await tokenContract.tokenMinted(parseInt(tokenId)));
    }
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
    let signer = web3React.library.getSigner(web3React.account);
    let signedContract = new ethers.Contract(CONTRACT_ADDRESS, Puppeeth.abi, signer);
    try {
      let payment = ethers.utils.parseEther(".015");
      let overrides = {
        value: payment
      };
      const transaction = await signedContract.mint(tokenId, overrides);
      await transaction.wait();
      setOpenBackdrop(false);
      // let filter = signedContract.filters.Transfer(null, web3React.account, null);
      // signedContract.on(filter, (from, to, amount, event) => {
      //   console.log(`I got ${ ethers.utils.formatEther(amount) } from ${ from }.`);
      //   setOpenBackdrop(false);
      // });
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
              Please check your connected wallet...
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

        {walletConnected() && tokenId !== 0 &&
        <img
          src={tokenIdImg}
          alt={"Puppee " + tokenId}
          className={classes.mainImg} />
        }
        {(!walletConnected() || tokenId === 0) &&
        <img
          src="/puppees-2x2.jpg"
          alt={"Puppee 55555"}
          className={classes.mainImg} />
        }
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
                helperText="Only five (5) numbers, one through five (1-5)"
                maxLength={5}
                fullWidth
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
                  {mintedToken ? "Sold!" : "Mint!"}
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" align="center">{getFormattedWalletAddress()}</Typography>
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
