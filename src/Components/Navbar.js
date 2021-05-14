import useStyles from './styles';
import {Typography, Toolbar, Button, AppBar, createMuiTheme, ThemeProvider} from '@material-ui/core';
import {HowToVote} from '@material-ui/icons';
import useTheme from './theme';

const Navbar = () => {
    const classes = useStyles();
    
    return(
        <ThemeProvider theme = {useTheme}>
            <AppBar className = {classes.appBar} color = "primary">
            <Toolbar >
               <Button color="inherit" href = "/" startIcon = {<HowToVote/>} >
               <Typography variant="h6" style={{flex:1}}>
                MATDAAN
               </Typography>
               </Button>
               <Typography variant="h6" style={{flex:1}}>
               </Typography>
               <Button color="inherit" href = "/login">Login</Button>
               <Button color="inherit" href = "/signup">Sign Up</Button>
            </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
export default Navbar;