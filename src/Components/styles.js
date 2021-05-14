import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar:{
    height: "8vh",
    marginBottom: "10px"
  },
  container: {
    backgroundColor: '#060238',
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
    padding: '20px 0',
    backgroundColor: '#06004D'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#011763'
  },
  cardMedia: {
      paddingTop: '56.25%' //16:9
  },
  cardContent: {
     flexGrow: 1 
  },
  footer: {
    backgroundColor: '#102049',
      padding: '50px 0'
  },
  img: {
    height: '50%',
    width: '100%'
  },
  paperStyleLogin:{
    margin: "20px auto",
    padding: 20,
    height: '70vh',
    width: 350,
    marginTop: "70px",
    backgroundColor: "#06004D"
  },
  paperStyleSignup:{
    margin: "20px auto",
    padding: 20,
    height: '90vh',
    width: 350,
    marginTop: "70px",
    backgroundColor: "#06004D"
  },
  textField: {
    backgroundColor: '#102049',
    marginTop: "20px",
    width:300
  },
  paperStyleCreate: {
    margin: "20px auto",
    padding: 20,
    height: '90vh',
    width: 550,
    marginTop: "70px",
    backgroundColor: "#06004D"
  },
  paperStyleBallot: {
    margin: "20px auto",
    padding: 20,
    height: '90vh',
    width: 1000,
    marginTop: "70px",
    backgroundColor: '#060238'
  },
  textFieldCreate: {
    backgroundColor: '#102049',
    marginTop: "20px",
    width:500
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