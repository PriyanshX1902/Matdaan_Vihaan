import {Typography} from '@material-ui/core';
import useStyles from './styles';

const Credit = ()  => {
    const classes = useStyles();
    return(
        <footer className = {classes.footer}>
            <Typography variant="h6" align="center" gutterBottom color = "textPrimary">
                Made by Priyansh Bhatnagar and Sneha Singh
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                xomeone@somenone.com
            </Typography>
        </footer>
    );
}
export default Credit;