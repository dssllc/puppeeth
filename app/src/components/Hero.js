import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "'Mali', cursive",
    fontSize: 72,
    letterSpacing: '-0.25rem'
  }
}));

export default function Hero() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
        <font color="#5305FA">p</font>
        <font color="#FF0094">u</font>
        <font color="#00FE39">p</font>
        <font color="#A305FA">p</font>
        <font color="#FF0000">e</font>
        <font color="#00FE39">e</font>
        <font color="#00FDE1">t</font>
        <font color="#1F06EB">h</font>
      </Typography>
      <Typography variant="h5" align="center" paragraph>
        An NFT avatar art collection made with love ❤️ and puppees 🐶
      </Typography>
    </Container>
  );
}
