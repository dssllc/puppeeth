import { Typography, Grid, makeStyles } from '@material-ui/core';

export default function About() {

  const useStyles = makeStyles((theme) => ({
    aboutRiver: {
      backgroundColor: theme.palette.primary.light,
      width: "100%",
      color: "#fff",
      marginTop: theme.spacing(2)
    },
    question: {
      fontWeight: "bold",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <>
    <Grid item xs={12} md={8} className={classes.aboutRiver}>
      <Typography variant="h5" align="center">
        About
      </Typography>

      <Typography className={classes.question}>Who made the artwork?</Typography>
      <Typography>The original artwork is by a young lady named Olivia. She was 11 years old when the collection was created.</Typography>
      <Typography>WE ARE VERY PROUD ❤️</Typography>

      <Typography className={classes.question}>Who made the token and web3 site?</Typography>
      <Typography>The web3 development is by Decentralized Software Systems, LLC. We are a small business focused on web3 development and technologies.</Typography>

      <Typography className={classes.question}>How many Puppees are there?</Typography>
      <Typography>Puppeeth has a supply of <strong>3125</strong> Puppees controlled by an algorithm, not a counter. Each ID is specific to the Puppee.</Typography>

      <Typography className={classes.question}>How much does it cost to mint?</Typography>
      <Typography>Only <strong>0.015ETH</strong> + gas. Mint yours now!</Typography>

      <Typography className={classes.question}>What kind of token is Puppeeth?</Typography>
      <Typography>Puppeeth uses the ERC-721 token standard on Ethereum. Please check out the contract on Etherscan using the link at the bottom of the page.</Typography>

      <Typography className={classes.question}>Where are the token assets stored?</Typography>
      <Typography>Both the NFT metadata and Puppee images are stored and pinned on IPFS.</Typography>

      <Typography className={classes.question}>What makes this token unique?</Typography>
      <Typography>Puppeeth uses a simple algorithm to control the token supply and valid ID values.</Typography>
      <Typography>The algorithm is a <em>pure</em> function that allows for the <u>token mint to consume around the same gas as a token transfer</u>!</Typography>

      <Typography className={classes.question}>What makes a Puppee unique?</Typography>
      <Typography>Each number in the Puppee ID indicates a specific attribute. Each attribute is 1 in 5, but attribute combinations make each Puppee more rare than others.</Typography>
      <Typography>For example, there are only 100 Puppees with one number different than the others (e.g. 51111, 44344, 23222).</Typography>
      <Typography>Find a unique combination before they are all minted!</Typography>

      <Typography className={classes.question}>How many tokens can I mint at once?</Typography>
      <Typography>Tokens can be minted one at a time. This was decided to allow buyers a fair shot at a Puppee they like.</Typography>

      <Typography className={classes.question}>How many tokens did the creators get?</Typography>
      <Typography>We minted 11 tokens when the contract was deployed, for friends and family. All new tokens must be minted through the contract, for everyone.</Typography>
    </Grid>
    </>
  );
}
