import Home from './Home';
import Credit from './Components/Credit'
import Navbar from './Components/Navbar';
import { CssBaseline } from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import Signup from './signup';

function App() {
  return (
    <>
    <Router>
      <CssBaseline>
        <Switch>
          <Route path = '/' exact component = {Home}/>
          <Route path = '/login' component = {Login}/>
          <Route path = '/signup' component = {Signup}/>
        </Switch>
      </CssBaseline>
    </Router>
    
    
    </>
    
  );
}

export default App;
