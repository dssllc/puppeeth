import {
  makeStyles,
  Container,
  Grid,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Faqs from './Faqs';
import Proceeds from './Proceeds';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#A305FA",
    color: theme.palette.background.paper,
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    },
  },
}));

export default function Info() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid
          container
          spacing={matches ? 6 : 0}
          justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <Faqs />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Proceeds />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
