import React, { Component } from 'react';
// `BrowserRouter` mimics a server. we are renaming it as well. 
import { BrowserRouter as Router, Route } from 'react-router-dom';
// `Provider` provides our application with the store which holds the state
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));  // we can call anything in our store with `store.dispatch`. this is being called from actions > authActions.js. this helps with making sure we're logged in even if the page is reloaded. 
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={ Landing } />
            <div className='container'>
              <Route exact path='/register' component={ Register } />
              <Route exact path='/login' component={ Login } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
