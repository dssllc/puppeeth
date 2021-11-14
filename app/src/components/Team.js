import { Typography, makeStyles, Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "'Mali', cursive",
    letterSpacing: '-0.25rem'
  },
  name: {
    fontFamily: "'Mali', cursive",
    letterSpacing: '-0.20rem'
  },
  photo: {
    width: "100%",
    maxWidth: "600px",
    border: "3px solid white"
  }
}));

export default function Team() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={6}
        justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Typography className={classes.title} component="h2" variant="h3" align="center" gutterBottom>
            artist
          </Typography>
          <img src="olivia.jpg" alt="Olivia Porter - Artist" className={classes.photo} />
          <Typography className={classes.name} component="h3" variant="h5">
          Olivia Porter 🎨 🎓
          </Typography>
          <Typography component="h4" variant="body2" gutterBottom>
           Artist and Student
          </Typography>
          <Typography paragraph>At 11 years old, Olivia enjoys laughing, drawing, reading, playing with her puppee, getting good grades, and being an all-around great young lady!</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography className={classes.title} component="h2" variant="h3" align="center" gutterBottom>
          developer
          </Typography>
          <img src="david.jpg" alt="David Porter - Developer" className={classes.photo} />
          <Typography className={classes.name} component="h3" variant="h5">
           David Porter 💼 💻
          </Typography>
          <Typography component="h4" variant="body2" gutterBottom>
           CEO of Decentralized Software Systems, LLC
          </Typography>
          <Typography paragraph>A father, husband, and experienced web developer, David loves to find ways to work with Olivia on new and interesting projects.</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
