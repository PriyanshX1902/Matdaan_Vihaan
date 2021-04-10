import {Typography, Container, Grid, CardContent, Card, Button, Paper} from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import useStyles from './Components/styles';
import fire from './firebase';
import axios from 'axios';
import { useEffect, useState, Fragment} from 'react';
import {DataGrid, GridCellParams} from '@material-ui/data-grid';
import { useHistory } from 'react-router';


const Dashboard = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [createdlist, setCreatedList] = useState([]);
    const [voterList, setVoterList] = useState([]);
    const [candidateList, setCandidateList] = useState([]);
    const [link, setLink] = useState('');
    const history = useHistory();


    const createdColumns = [
      {
          field: "electionid",
          headerName : "Election ID",
          width: 300
      },
      {
        field: "title",
        headerName : "Title",
        width: 300
      },
      {
        field: "date",
        headerName : "Date",
        width: 200
      },
      {
          field: "actions",
          headerName : "Action",
          width: 200,
          renderCell: (params)=>
          {
            const handleElectionStats = () => {
              history.push('/elections/'+params.getValue("electionid")+'/stats');
            }

          return(
              <Fragment>
                  <Button className= {classes.buttons} variant = "contained" color = "primary" size = "small" fullWidth onClick = {()=>{handleElectionStats();}}>
                      See Stats
                  </Button>
              </Fragment>
          )
          }
      }
  ]
  const votersColumns = [
    {
        field: "electionid",
        headerName : "Election ID",
        width: 300
    },
    {
      field: "actions",
      headerName : "Action",
      width: 200,
      renderCell: (params)=>{
        const handleBallot = () =>{
          history.push('/elections/'+params.getValue("electionid"));
        }
        return(
          <Fragment>
              <Button className= {classes.buttons} variant = "contained" color = "primary" size = "small" fullWidth onClick = {()=>{handleBallot();}}>
                  Enter
              </Button>
          </Fragment>
      )}
    }
]
const candidatesColumns = [
  {
      field: "electionid",
      headerName : "Election ID",
      width: 300
  },
  {
    field: "party",
    headerName : "Party Name",
    width: 300
  },
  {
      field: "actions",
      headerName : "Action",
      width: 200,
      renderCell: (params)=>{
        const handleBallot = () =>{
          history.push('/elections/'+params.getValue("electionid"));
        }
        return(
          <Fragment>
              <Button className= {classes.buttons} variant = "contained" color = "primary" size = "small" fullWidth onClick = {()=>{handleBallot();}}>
                  Enter
              </Button>
          </Fragment>
      )}
  }
]
    const getUserProfile = () =>  {
        const user = fire.auth().currentUser;
        try {
          axios.get('http://localhost:5000/userprofile/'+ user.uid).then(res =>{
            setName(res.data.name);
            setEmail(res.data.email);
            setUsername(res.data.username);
            setPhoneNumber(res.data.phoneNumber);
          });
          axios.get('http://localhost:5000/yourelections/'+ user.uid).then(res =>{
            setCreatedList(res.data);
          })
          axios.get('http://localhost:5000/asvoters/'+ user.uid).then(res =>{
            setVoterList(res.data);
          })
          axios.get('http://localhost:5000/ascandidates/'+ user.uid).then(res =>{
            setCandidateList(res.data);
          })
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
                    <Button variant="contained" color="primary" href = "/candidate">
                      Participate as a Candidate
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" href = "/voter">
                      Participate as a Voter
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" href = "/create">
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
         <Container>
         <Grid container spacing={2}>
        <Paper className = {classes.paperStyleBallot} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        Your Elections
        </Typography>
        <DataGrid rows = {createdlist} columns = {createdColumns}/>
        </Paper>
        </Grid>
         </Container>
         <Container>
         <Grid container spacing={2}>
        <Paper className = {classes.paperStyleBallot} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        As Voters
        </Typography>
        <DataGrid rows = {voterList} columns = {votersColumns}/>
        </Paper>
        </Grid>
         </Container>
         <Container>
         <Grid container spacing={2}>
        <Paper className = {classes.paperStyleBallot} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        As Candidates
        </Typography>
        <DataGrid rows = {candidateList} columns = {candidatesColumns}/>
        </Paper>
        </Grid>
         </Container>
        </main>   
    );
}
export default Dashboard;