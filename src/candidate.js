import useStyles from './Components/styles';
import {Typography, Container, Button, TextField, Paper, ThemeProvider } from '@material-ui/core';
import LoggedNavbar from './Components/loggedNavbar';
import React from 'react';
import fire from './firebase';
import axios from 'axios';
import {Alert} from '@material-ui/lab'
import {useState} from 'react';
import useTheme from './Components/theme';

const Candidate = () => {

    const classes = useStyles();
    const [electionCode, setElectionCode] = React.useState();
    const [partyName, setPartyName] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [partySymbol, setPartySymbol] = useState(null);
    const [urlProfileImage, setUrlProfileImage] = useState('');
    const [urlPartySymbol, setUrlPartySymbol] = useState('');
    const [progressProfileImage, setProgressProfileImage] = useState(0);
    const [progressPartySymbol, setProgressPartySymbol] = useState(0);

    const handleChangeProfileImage = e => {
        if (e.target.files[0]) {
          setProfileImage(e.target.files[0]);
        }
      };
    
      const handleChangePartySymbol = e => {
        if (e.target.files[0]) {
          setPartySymbol(e.target.files[0]);
        }
      };
    
      const handleProfileImageUpload = () => {
        const uploadTask = fire.storage().ref(`ProfileImages/${profileImage.name}`).put(profileImage);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progressProfileImage = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressProfileImage(progressProfileImage);
          },
          error => {
            console.log(error);
          },
          () => {
            fire.storage().ref("ProfileImages").child(profileImage.name).getDownloadURL().then(urlProfileImage => {
                setUrlProfileImage(urlProfileImage);
              });
          }
        );
      };

      const handlePartySymbolUpload = () => {
        const uploadTask = fire.storage().ref(`PartySymbols/${partySymbol.name}`).put(partySymbol);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progressPartySymbol = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressPartySymbol(progressPartySymbol);
          },
          error => {
            console.log(error);
          },
          () => {
            fire.storage().ref("PartySymbols").child(partySymbol.name).getDownloadURL().then(urlPartySymbol => {
                setUrlPartySymbol(urlPartySymbol);
              });
          }
        );
      };
    

    const handleCandidate =  (e) =>{
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
               const candidate = {
                  code: electionCode,
                  candidateid: user.uid,
                  profileImageURL: urlProfileImage,
                  partySymbolURL: urlPartySymbol,
                  party: partyName
              }
              axios.post('http://localhost:5000/candidateregistration', candidate)
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
        <LoggedNavbar/>
       <main>
           
           <div className = {classes.container}>
           <Container className = {classes.cardGrid} maxWidth = "md">
        <Typography variant="h2" align="center" color="textPrimary" family="Roboto" gutterBottom>
        PARTICIPATE AS A CANDIDATE
        </Typography>
        <Paper className = {classes.paperStyleCreate} width={500} elevation = {10} xs={12} md={12} sm={12}>
        <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
        Enter Details
        </Typography>
    <form onSubmit = {handleCandidate}>
    {error &&<Alert severity="error" >{error}</Alert>}
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Election Code" onChange = {(e)=>{setElectionCode(e.target.value)}}/>
        <TextField required className = {classes.textFieldCreate} variant = "filled" color = "secondary"  label = "Name of Your Party" onChange = {(e)=>{setPartyName(e.target.value)}}/>
        <br/> <br/>
     <Typography>Profile Picture</Typography>
      <br />
      <input type="file" onChange={handleChangeProfileImage} />
      <button onClick={handleProfileImageUpload}>Upload</button>
      <br/>
      <progress value={progressProfileImage} max="100" />
      <br/> <br/>
      <Typography>Party Symbol</Typography>
      <br />
      <input type="file" onChange={handleChangePartySymbol} />
      <button onClick={handlePartySymbolUpload}>Upload</button>
      <br/>
      <progress value={progressPartySymbol} max="100" />
          
        {success? (
           <>
           <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
           Registration Successful!
           </Typography> 
           <Button className = {classes.buttons} color = "primary"  variant = "contained" fullWidth href = "/">Back</Button>
          </> 
        ):(
          <Button className = {classes.buttons} color = "primary" type = "submit" variant = "contained" fullWidth >Participate</Button>
        )}
        
    </form>
    </Paper>
       
         </Container>
         </div>
       </main> 
       </ThemeProvider>
    );
}
export default Candidate;