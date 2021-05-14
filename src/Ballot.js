import {Typography, Container, Grid, CardContent, Card, Button, Paper, ThemeProvider} from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import useStyles from './Components/styles';
import fire from './firebase';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {DataGrid} from '@material-ui/data-grid';
import useTheme from './Components/theme';



const Ballot = () => {
    const classes = useStyles();
    const {electionId} = useParams();
    const [list, setList]  = useState([]);
    const [resultList, setResultList] =  useState([]);
    const [voteSuccess, setVoteSuccess] = useState(false);
    const history = useHistory();
    const columns = [
        {
            field: "party",
            headerName : "Candidate Party name",
            width: 600
        },
        {
            field: "actions",
            headerName : "Vote",
            width: 200,
            renderCell: (params)=>{
                const handleVote = () =>{
                    setVoteSuccess(true);
                    axios.get('http://localhost:5000/elections?electionid='+electionId+'&partyName='+params.getValue("party")).then(res=>{

                    })
                }
            return(
                <>
                (
                    <Fragment>
                    <Button className= {classes.buttons} variant = "contained" color = "primary" size = "small" fullWidth onClick = {()=>{handleVote();}}>
                    Vote
                    </Button>
                    </Fragment>
                )
                </>
            
                
            )}
        }
    ]
    const resultColumns = [
        {
            field: "party",
            headerName : "Candidate Party name",
            width: 600
        },
        {
            field: "votes",
            headerName : "Total Votes",
            width: 200,
        }
    ]
    
    const fetchCandidates = () =>{
        axios.get('http://localhost:5000/getcandidatelist/'+ electionId).then(res=>{
            console.log(res.data);
            setList(res.data);
        });
        axios.get('http://localhost:5000/getresult/'+electionId).then(res=>{
            setResultList(res.data);
        })
        
    }
    useEffect(()=>{
        fetchCandidates();
    }, [])


    return(
        <ThemeProvider theme = {useTheme}>
        <main>
        <LoggedNavbar/>
        <div className = {classes.container}>
        <Container className = {classes.cardGrid} maxWidth = "md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        Election Ballot
        </Typography>
        <Grid container spacing={2}>
        <Paper className = {classes.paperStyleBallot} elevation = {10} xs={14} md={14} sm={14}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        Election ID : {electionId}
        </Typography>
        {voteSuccess ?(
            <DataGrid rows = {resultList} columns = {resultColumns}/>
        ):(
            <DataGrid rows = {list} columns = {columns}/>
        )}
        
        </Paper>
        </Grid>
         </Container>
         </div>
        </main>   
        </ThemeProvider>
    );
}
export default Ballot;