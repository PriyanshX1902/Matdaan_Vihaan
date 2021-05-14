import {Typography, Container, Grid, CardContent, Card, CardMedia, Button, ThemeProvider} from '@material-ui/core';
import useStyles from './Components/styles';
import Credit from './Components/Credit'
import Navbar from './Components/Navbar';
import useTheme from './Components/theme';

const Home = () => {
    const classes = useStyles();
    return(
      <>
        <Navbar/>
        <ThemeProvider theme = {useTheme}>
        <main>  
        <div className = {classes.container}>
        <Container className={classes.container} maxWidth="md" >
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
                    The election process and the results are transparent to all candidates and voters!
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
                    No one can tamper your votes as the entire process is extremely secure due to blockchain used in the back end.
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
                    You will never have to wait in long queues as you can cast your vote just by a few clicks!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
          </div>        

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
        </ThemeProvider>
        <Credit/>
      </>    
    );
}
export default Home;