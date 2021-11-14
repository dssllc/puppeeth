import { Container, Typography, makeStyles } from '@material-ui/core';

export default function Hero() {

  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(4, 0, 3),
    },
    title: {
      fontFamily: "'Mali', cursive",
      fontSize: 72,
      letterSpacing: '-0.2rem'
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
        <Container maxWidth="xs">
          <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
            <font color="#5305FA">p</font>
            <font color="#FF0094">u</font>
            <font color="#FF0000">p</font>
            <font color="#A305FA">p</font>
            <font color="#DDFA43">e</font>
            <font color="#00FE39">e</font>
            <font color="#00FDE1">t</font>
            <font color="#1F06EB">h</font>
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            An NFT avatar art collection made with love ❤️ and puppees 🐶
          </Typography>
        </Container>
      </div>
  );
}
