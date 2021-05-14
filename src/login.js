import useStyles from './Components/styles';
import {Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core';
import fire from './firebase';
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import Credit from './Components/Credit'
import Navbar from './Components/Navbar';
import useTheme from './Components/theme';

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        if(email === ''|| password ===''){
            return setEmailError('All fields are required!');
        }
        
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{history.push('/');})
        .catch(err=>{
            switch(err.code){
                case "auth/user-not-found":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/wrong-password":
                    setPasswordError(err.message); 
                    break; 
                default: break;         
            }

        }); 

    }
    return(
    <>
       <Navbar/>
       <ThemeProvider theme = {useTheme}>
       <main>
           <Grid className = {classes.container}>
               <Paper className = {classes.paperStyleLogin} elevation = {10}>

                   <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
                    Login
                   </Typography>
                   <form onSubmit = {handleLogin}>
                       {emailError && <Alert severity = "error">{emailError}</Alert>}
                       {passwordError && <Alert severity = "error">{passwordError}</Alert>}
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "E-mail"  onChange = {(e)=>{setEmail(e.target.value)}} error = {emailError} />
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "Password" type = "Password" onChange = {(e)=>{setPassword(e.target.value)}} error = {passwordError}/>
                   <Button className = {classes.buttons} color = "primary" type = "submit" variant = "contained" fullWidth  >Log in</Button>
                   </form>
                   <FormControlLabel control = {<Checkbox name = "rememberMe" color = "primary"/>} label = "Remember me"/>
                   <p>
                   <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                       <Link href = "#" >
                       <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>   
                       Forgot Password?
                       </Typography>
                       </Link>
                   </Typography></p>
                   <p>
                   <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                    Don't have an account? 
                    <Link href = "/signup"> <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>Sign Up </Typography></Link>
                    instead     
                   </Typography></p>
               </Paper>
           </Grid>
       </main>
       </ThemeProvider>
       <Credit/> 
    </>
    );
}
export default Login;
