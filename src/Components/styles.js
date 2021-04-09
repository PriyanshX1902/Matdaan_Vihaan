import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar:{
    height: "8vh",
    marginBottom: "10px"
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5,0,5)
  },
  icon: {
    marginRight: '20px',
  },
  buttons: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  cardGrid: {
    marginTop: "40px",
    padding: '20px 0'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
      paddingTop: '56.25%' //16:9
  },
  cardContent: {
     flexGrow: 1 
  },
  footer: {
      backgroundColor: '#3f51b5',
      padding: '50px 0'
  },
  img: {
    height: '50%',
    width: '100%'
  },
  textField: {
    marginTop: "20px",
    width:300
  },
  paperStyleCreate: {
    margin: "20px auto",
    padding: 20,
    height: '90vh',
    width: 550,
    marginTop: "70px"
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  }
}));

export default useStyles;