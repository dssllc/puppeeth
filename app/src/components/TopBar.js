import { AppBar, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  rarible: {
    marginRight: theme.spacing(2),
    maxWidth: 24
  },
  etherscan: {
    marginRight: theme.spacing(2),
    maxWidth: 24
  },
  filler: {
    flex: 1
  },
  customAppBar: {
    background: 'transparent',
    boxShadow: 'none'
  }
}));

export default function TopBar() {
  const classes = useStyles();

  return (
    <AppBar position="relative" elevation={0} className={classes.customAppBar}>
      <Toolbar>
        <img src="favicon-32x32.png" alt="puppeeth" className={classes.rarible} />
        <Typography className={classes.filler}></Typography>
        <Link target="_blank" href="https://github.com/dssllc/puppeeth">
          <GitHubIcon className={classes.icon} aria-label="GitHub" />
        </Link>
        <Link target="_blank" href="https://twitter.com/puppeeth">
          <TwitterIcon className={classes.icon} aria-label="Twitter" />
        </Link>
        <Link target="_blank" href="https://rarible.com/puppeeth">
          <img src="rarible.png" alt="Rarible" className={classes.rarible} />
        </Link>
        <Link target="_blank" href="https://etherscan.io/address/0x21A51805A7f47AB2261809E93F4617B68234CdF1">
        <img src="etherscan-logo-circle.png" alt="Etherscan" className={classes.etherscan} />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
