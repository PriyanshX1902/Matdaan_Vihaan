import useStyles from './Components/styles';
import {Typography, Container, Button, TextField, Paper, Grid, ThemeProvider } from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import React from 'react';
import {useEffect} from 'react'
import axios from 'axios';
import fire from 'firebase';
import useTheme from './Components/theme';

const Create = () => {

    const classes = useStyles();
    const [title, setTitle] = React.useState('');
    const [organisation, setOrganisation] = React.useState('');
    const [description , setDescription] = React.useState('');
    const [date, setDate] = React.useState('');

    const [code , setCode] = React.useState();
    const [electionGenerated, setElectionGenerated] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState();
    const handleDateChange = (date) => {
    setSelectedDate(date);
  };

    const handleGenerateCode = (e) =>{
      e.preventDefault();
      const newCode = Date.now();
      setCode(newCode);
      setElectionGenerated(true);
      const creator = fire.auth().currentUser;
      const election = {
        title: title,
        organisation: organisation,
        description: description,
        date: date,
        code: newCode,
        creatorid: creator.uid
      }
      axios.post('http://localhost:5000/createelection', election)
      .catch((err)=>{
        console.log(err);
      });

    }



    return(
      <ThemeProvider theme = {useTheme}>
       <main>
           <LoggedNavbar/>
           <div className = {classes.container}>
           <Container className = {classes.cardGrid} maxWidth = "md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        CREATE AN ELECTION
        </Typography>
        <Grid>
        <Paper className = {classes.paperStyleCreate} width={500} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        Election Details
        </Typography>
    <form onSubmit = {handleGenerateCode}>
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Title" onChange = {(e)=>{setTitle(e.target.value)}}/>
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Organization/Insitution" onChange = {(e)=>{setOrganisation(e.target.value)}}/>
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Description" onChange = {(e)=>{setDescription(e.target.value)}}/>
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Date" type = "date" defaultValue = "" onChange = {(e)=>{setDate(e.target.value)}}/>
        {electionGenerated ? (
          <>
          <Typography variant="h4" align="center" color="textPrimary" family="Roboto" gutterBottom>Election succesfully generated!! Your election code is {code}</Typography>
          <Button className = {classes.buttons} color = "primary"  variant = "contained" fullWidth href = "/">Back</Button>
          </>
        ):(
          <Button className = {classes.buttons} color = "primary" type = "submit" variant = "contained" fullWidth >Create</Button>
        )}
        
    </form>
    
    </Paper>
    </Grid>
         </Container>
         </div>
       </main>
     </ThemeProvider>   
    );
}
export default Create;
