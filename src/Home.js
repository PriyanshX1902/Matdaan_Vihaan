import {Typography, Container, Grid, CardContent, Card, CardMedia, Button} from '@material-ui/core';
import useStyles from './Components/styles';
import Credit from './Components/Credit';

const Home = () => {
    const classes = useStyles();
    return(
        <main>
        <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        MATDAAN
        </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                  className={classes.cardMedia}
                  image={process.env.PUBLIC_URL + "/images/img2.jpg"}
                  title="Image Title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Transparent
                    </Typography>
                    <Typography>
                      This is a media card.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                  className={classes.cardMedia}
                  image={process.env.PUBLIC_URL + "/images/img3.jpg"}
                  title="Image Title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Secure
                    </Typography>
                    <Typography>
                      This is a media card.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                  className={classes.cardMedia}
                  image={process.env.PUBLIC_URL + "/images/img1.jpg"}
                  title="Image Title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Swift
                    </Typography>
                    <Typography>
                      This is a media card.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>        

          <div className={classes.container}>
            <Container maxWidth="md">
              <Typography variant="h5" align="center" color="textPrimary" paragraph>
                The one stop solution for conducting online elections for free! Whether it be your college elections
                or the elections in your constituency, everything can now be done within a few clicks at your personal
                desktop or mobile.
                <p>Matdaan ensures proper voter authentication and security by using blockchain.</p>
              </Typography>
              <div className={classes.buttons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" href = "/login">
                      Want to organize an election?
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" href = "/login">
                      Get ready for the polls!
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
        </main>   
    );
}
export default Home;