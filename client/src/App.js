import React, { Component } from 'react';
// `BrowserRouter` mimics a server. we are renaming it as well. 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// `Provider` provides our application with the store which holds the state
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import './App.css';

// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));  // we can call anything in our store with `store.dispatch`. this is being called from actions > authActions.js. this helps with making sure we're logged in even if the page is reloaded. 

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){  // the object contains the `exp` value
    // logout user
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = '/login';
  }
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
              <Switch>  {/* this will help prevent weird redirect issues */}
                <PrivateRoute exact path='/dashboard' component={ Dashboard } />
              </Switch>
              <Switch>  {/* this will help prevent weird redirect issues */}
                <PrivateRoute   // protected route
                  exact 
                  path='/create-profile' 
                  component={ CreateProfile } />
              </Switch>
              <Switch>  {/* this will help prevent weird redirect issues */}
                <PrivateRoute   // protected route
                  exact 
                  path='/edit-profile' 
                  component={ EditProfile } />
              </Switch>
              <Switch>  {/* this will help prevent weird redirect issues */}
                <PrivateRoute   // protected route
                  exact 
                  path='/add-experience' 
                  component={ AddExperience } />;
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
