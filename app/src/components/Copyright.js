import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    flexGrow: 1,
  },
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="subtitle" align="center" component="p">
      &copy; {new Date().getFullYear()} <Link href="mailto:info@decentralizedsoftware.systems">Decentralized Software Systems, LLC</Link>
      </Typography>
    </footer>
  );
}
