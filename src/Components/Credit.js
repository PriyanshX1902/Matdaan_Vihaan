import {Typography, ThemeProvider} from '@material-ui/core';
import useStyles from './styles';
import useTheme from './theme';

const Credit = ()  => {
    const classes = useStyles();
    return(
        <ThemeProvider theme = {useTheme}>
        <footer className = {classes.footer} color = "primary">
            <Typography variant="h6" align="center" gutterBottom color = "textPrimary">
                Made by Priyansh Bhatnagar and Sneha Singh
            </Typography>
            <Typography variant="subtitle1" align="center" color="textPrimary" gutterBottom>
                praudyogikee1@gmail.com
            </Typography>
        </footer>
        </ThemeProvider>
    );
}
export default Credit;