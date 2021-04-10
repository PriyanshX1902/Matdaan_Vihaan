import {Typography, Container, Grid, CardContent, Card, Button, Paper} from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import useStyles from './Components/styles';
import fire from './firebase';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useHistory } from 'react-router';


const Dashboard = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const history = useHistory();

    const getUserProfile = () =>  {
        const user = fire.auth().currentUser;
        try {
          axios.get('http://localhost:5000/userprofile/'+ user.uid).then(res =>{
            setName(res.data.name);
            setEmail(res.data.email);
            setUsername(res.data.username);
            setPhoneNumber(res.data.phoneNumber);
          });
         } catch (error) {
           
         }

    }

    useEffect(()=>{
      getUserProfile();
    }, []);


    return(
        <main>
        <LoggedNavbar/>
        <Container className = {classes.cardGrid} maxWidth = "md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        MATDAAN - DASHBOARD
        </Typography>
        <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={4}>
                <Card className={classes.card}>            
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Profile
                    </Typography>
                    <Typography>
                      {name}
                    </Typography>
                    <Typography>
                      {email}
                    </Typography>
                    <Typography>
                      {username}
                    </Typography>
                    <Typography>
                      {phoneNumber}
                    </Typography>
                    
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">      
                    </Typography>
                    <div className={classes.buttons}>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" >
                      Participate as a Candidate
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" >
                      Participate as a Voter
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Create an Election
                    </Button>
                  </Grid>
                </Grid>
              </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
         </Container>
        </main>   
    );
}
export default Dashboard;