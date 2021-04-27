import {Typography, Container, Grid, CardContent, Card, Button, Paper} from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import useStyles from './Components/styles';
import fire from './firebase';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import {DataGrid} from '@material-ui/data-grid';



const Result = () => {
    const classes = useStyles();
    const {electionId} = useParams();
    const [list, setList]  = useState([]);
    const [voteSuccess, setVoteSuccess] = useState(false);
    const history = useHistory();
    const columns = [
        {
            field: "party",
            headerName : "Candidate Party name",
            width: 600
        },
        {
            field: "votes",
            headerName : "Total Votes",
            width: 400
        }
    ]
    const fetchCandidates = () =>{
        axios.get('http://localhost:5000/getresult/'+ electionId).then(res=>{
            console.log(res.data);
            setList(res.data);
        });
    }
    useEffect(()=>{
        fetchCandidates();
    }, [])


    return(
        <main>
        <LoggedNavbar/>
        <Container className = {classes.cardGrid} maxWidth = "md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        Election Result
        </Typography>
        <Grid container spacing={2}>
        <Paper className = {classes.paperStyleBallot} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        Election ID : {electionId}
        </Typography>
        <DataGrid rows = {list} columns = {columns}/>
        </Paper>
        </Grid>
         </Container>
        </main>   
    );
}
export default Result;