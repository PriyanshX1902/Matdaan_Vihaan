import useStyles from './Components/styles';
import {Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import Credit from './Components/Credit';
import Navbar from './Components/Navbar';
const Login = () => {
    const classes = useStyles();
    

    return(
      <>
       <Navbar/>  
       <main>
           <Grid >
               <Paper className = {classes.paperStyleLogin} elevation = {10} xs={12} md={12} sm={12}>

                   <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
                    Login
                   </Typography>
                   <form>
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "E-mail"   />
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Password" type = "Password" />
                   <Button className = {classes.buttons} color = "primary" type = "submit" variant = "contained" fullWidth  >Log in</Button>
                   </form>
                   <FormControlLabel control = {<Checkbox name = "rememberMe" color = "primary"/>} label = "Remember me"/>
                   <p>
                   <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                       <Link href = "#" >
                       Forgot Password?
                       </Link>
                   </Typography></p>
                   <p>
                   <Typography variant = "h7"  color = "textPrimary" family = "Roboto" gutterBottom>
                    Don't have an account? 
                    <Link href = "/signup"> Sign Up </Link>
                    instead     
                   </Typography></p>
               </Paper>
           </Grid>
       </main> 
       <Credit/>
       </>
    );
}
export default Login;
