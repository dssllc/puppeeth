import { AppBar, Toolbar, Typography, makeStyles, Link } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  },
  rarible: {
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
        <Typography className={classes.filler}></Typography>
        <Link target="_blank" href="https://twitter.com/puppeeth">
          <TwitterIcon className={classes.icon} aria-label="twitter" />
        </Link>
        <Link target="_blank" href="https://rarible.com/puppeeth">
          <img src="rarible.png" alt="rarible" className={classes.rarible} />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
