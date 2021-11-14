import { Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    flexGrow: 1
  },
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Typography variant="subtitle2" align="center" component="p">
      made with ❤️ by
      <br />
      <Link href="mailto:info@decentralizedsoftware.systems">Decentralized Software Systems, LLC</Link>
      <br />
      &copy; {new Date().getFullYear()}
      </Typography>
    </footer>
  );
}
