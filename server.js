const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// DB config `.mongoURI` at the end grabs the value from the file
const db = require('./config/keys').mongoURI;

// connect to mongoDB `{ useNewUrlParser: true }` gets rid of mongoDB
// deprecation warning
mongoose
		.connect(db, {useNewUrlParser: true})
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.log(err));

// passport middleware 
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);  // from the passport config file, pass in `passport`

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// server static assets if in production
if(process.env.NODE_ENV === 'production'){
	// set static folder
	app.use(express.static('client/build'));  

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));  // for any route that hits `client/build` load the react `index.html` file within `build`
	})
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on Port ${port}`));