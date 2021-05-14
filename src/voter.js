import useStyles from './Components/styles';
import {Typography, Container, Button, TextField, Paper, ThemeProvider } from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import React from 'react';
import fire from './firebase';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import useTheme from './Components/theme';

const Voter = () => {

    const classes = useStyles();
    const [electionCode, setElectionCode] = React.useState();
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const handleVoter =  (e) =>{
        e.preventDefault();
        setError('');
        if(electionCode===''){
            return setError("Election code is Required!");
        }
        const code  = electionCode;
        try {
             fire.database().ref('/elections/'+ code).once('value', snap=>{
                if(snap.exists()){
                     setSuccess(true);
                 const user = fire.auth().currentUser;
                const voter = {
                    code: electionCode,
                    voterid: user.uid
                }
                axios.post('http://localhost:5000/voterregistration', voter)
                .catch((err)=>{
                    console.log(err);
                })
                }
                else{
                    setError('Election Code invalid!');
                }
            })

            
        } catch (error) {
            console.log(error);
        }
        
        
        

    }
    return(
        <ThemeProvider theme = {useTheme}>
       <main>
           <LoggedNavbar/>
           <div className = {classes.container}>
           <Container className = {classes.cardGrid} maxWidth = "md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        PARTICIPATE AS A VOTER
        </Typography>
        <Paper className = {classes.paperStyleCreate} width={500} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        Enter Details
        </Typography>
    <form onSubmit = {handleVoter}>
    {error &&<Alert severity="error" >{error}</Alert>}
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Election Code" onChange = {(e)=>{setElectionCode(e.target.value)}} error = {error}/>
        {success?(
            <>
             <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
             Registration Successful!
             </Typography> 
             <Button className = {classes.buttons} color = "primary"  variant = "contained" fullWidth href = "/">Back</Button>
            </> 
        ):(
            <>
            
            <Button className = {classes.buttons} color = "primary" type = "submit" variant = "contained" fullWidth >Participate</Button>
            </>
        )}
        
    </form>
    </Paper>
       
         </Container>
         </div>
       </main> 
       </ThemeProvider>
    );
}
export default Voter;