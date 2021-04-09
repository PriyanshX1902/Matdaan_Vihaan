import useStyles from './Components/styles';
import {Button, Grid, Link, Paper, TextField, Typography} from '@material-ui/core';
import Credit from './Components/Credit';
import Navbar from './Components/Navbar';
const Signup = () => {
    const classes = useStyles();


    return(
       <>
       <Navbar/> 
       <main>
           <Grid >
               <Paper className = {classes.paperStyleSignup} elevation = {10} xs={12} md={12} sm={12}>
                   <Typography variant = "h5" align = "center" color = "textPrimary" family = "Roboto" gutterBottom>
                    Create a new account
                   </Typography>
                   <form>
    
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Name" />
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "E-mail id" type = "E-mail" />
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Create Username"/>
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Phone Number" type = "Number" />
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Create Password" type = "Password" />
                   <TextField className = {classes.textField} variant = "outlined" color = "primary"  label = "Confirm Password" type = "Password" />
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
       <Credit/>
       </> 
    );
}
export default Signup;