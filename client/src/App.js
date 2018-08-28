import React, { Component } from 'react';
// `BrowserRouter` mimics a server. we are renaming it as well. 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
