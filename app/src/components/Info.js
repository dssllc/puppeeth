import {
  makeStyles,
  Container,
  Grid
} from '@material-ui/core';
import Faqs from './Faqs';
import Proceeds from './Proceeds';

const useStyles = makeStyles((theme) => ({
}));

export default function Info() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={6}
        justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Faqs />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Proceeds />
        </Grid>
      </Grid>
    </Container>
  );
}
