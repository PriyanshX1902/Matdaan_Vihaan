import useStyles from './Components/styles';
import {Button, Grid, Link, Paper, TextField, ThemeProvider, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import fire from './firebase';
import axios from 'axios';
import {useHistory} from 'react-router';
import Credit from './Components/Credit'
import Navbar from './Components/Navbar';
import useTheme from './Components/theme';

const Signup = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNo, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const history = useHistory();


    const handleSignup = (e) => {
        e.preventDefault();
        setPasswordError('');
        setEmailError('');
        if(name===''){
            setNameError('Name is Required');
            return;
        }
        if(username===''){
            setUsernameError('Username is Required');
            return;
        }
        if(password !== cpassword){
            setPasswordError('Passwords do not match');
            return;
        }
        fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred)=>{
            const newUser = {
                displayname: name,
                email: email,
                username: username,
                password: password,
                phoneNo: phoneNo,
                userid:cred.user.uid
            };
            console.log(newUser);
    
            axios.post('http://localhost:5000/createuser', newUser)
            .then(()=> console.log('User Registered!'))
            .catch(err=> {
                console.log(err);
            });
        }).then(()=>{history.push('/');})
        .catch(err=>{
            switch(err.code){
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message);
                    break;
                case "auth/weak-password":
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
               <Paper className = {classes.paperStyleSignup} elevation = {10} xs={12} md={12} sm={12}>
                   <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
                    Create a new account
                   </Typography>
                   <form onSubmit = {handleSignup}>
                   {nameError && <Alert severity = "error">{nameError}</Alert>}
                    {usernameError && <Alert severity = "error">{usernameError}</Alert>}
                    {emailError && <Alert severity = "error">{emailError}</Alert>}
                    {passwordError && <Alert severity = "error">{passwordError}</Alert>}
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "Name" onChange = {(e)=>setName(e.target.value)} error = {nameError} />
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "E-mail id" type = "E-mail" onChange = {(e)=>setEmail(e.target.value)} error = {emailError} />
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "Create Username" onChange = {(e)=>setUsername(e.target.value)} error = {usernameError} />
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "Phone Number" type = "Number" onChange = {(e)=>setPhoneNumber(e.target.value)}/>
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "Create Password" type = "Password" onChange = {(e)=>setPassword(e.target.value)} error = {passwordError} />
                   <TextField className = {classes.textField} variant = "filled" color = "secondary"  label = "Confirm Password" type = "Password" onChange = {(e)=>setCPassword(e.target.value)}/>
                   <Button className = {classes.buttons} color = "primary" type = "submit" variant = "contained" fullWidth >Sign up</Button>
                   </form>
                   <p><Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                    Already a user?
                    <Link href = "/login"> Log in </Link>
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
export default Signup;