import React, { useEffect, useState } from 'react';
import {CssBaseline} from '@material-ui/core';
import Credit from './Components/Credit'
import Navbar from './Components/Navbar';
import Home from './Home';
import Login from './login';
import Signup from './signup';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import fire from 'firebase';
import Dashboard from './Dashboard';
import Create from './create';
import Voter from './voter';
import Candidate from './candidate';

const App = () => {
  const [user, setUser] = useState('');
  const authlistener = () =>{
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        setUser(user);

      }
      else{
        setUser('');
      }
    });
  };
  useEffect(() =>{
    authlistener();
  }, []);

  return (
    <>
        {user ?
        <>
        <CssBaseline>
        <Router>
        <Switch>
          <Route path = '/' exact component = {Dashboard}/>
          <Route path = '/create' component = {Create}/>
          <Route path = '/voter' component = {Voter}/>
          <Route path = '/candidate' component = {Candidate}/>
        </Switch>
        </Router>
        </CssBaseline>
        </>  
        : 
        <>
        <CssBaseline>
        <Navbar/>
        <Router>
        <Switch>
          <Route path = '/' exact component = {Home} />
          <Route path = '/login' component = {Login} />
          <Route path = '/signup' component = {Signup} />
          
        </Switch>
        </Router>
        <Credit/>
        </CssBaseline>
        </>}
    </>
  );
}

export default App;