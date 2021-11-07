import {Typography, Grid, Link} from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Copyright() {
  return (
    <>
    <Grid item xs={12}>
      <Typography align="center">
      <Link target="_blank" href="https://twitter.com/puppeeth">
        <TwitterIcon />
      </Link>
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} <Link href="mailto:info@decentralizedsoftware.systems">Decentralized Software Systems, LLC</Link>
      </Typography>
      <Typography variant="body2" align="center">
        <Link target="_blank" href="https://etherscan.io/address/0x21A51805A7f47AB2261809E93F4617B68234CdF1">Etherscan</Link>
      </Typography>
    </Grid>
    </>
  );
}
