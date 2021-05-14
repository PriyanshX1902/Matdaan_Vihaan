import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import { dark } from '@material-ui/core/styles/createPalette';

const useTheme = createMuiTheme({
    palette:{
        primary: {
            main: '#102049'
        },
        secondary: {
            main:'#ffffff',
            light:'#011763'
        },
        tertiary:{
            main:'#060238'
        },
        fourth:{
            main:'#ffffff'
        },
        background:{
            default:'#011763',
            paper: '#060238'
        },
        text:{
            primary:'#FFFFFF'
        }
        
    }
});
export default useTheme;