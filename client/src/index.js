import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// console.log('GitHub Client ID is: ', process.env.REACT_APP_CLIENT_ID)
// console.log('GitHub Client Secret is: ', process.env.REACT_APP_CLIENT_SECRET)
