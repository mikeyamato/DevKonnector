const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB config `.mongoURI` at the end grabs the value from the file
const db = require('./config/keys').mongoURI;

// connect to mongoDB `{ useNewUrlParser: true }` gets rid of mongoDB
// deprecation warning
mongoose
		.connect(db, {useNewUrlParser: true})
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on Port ${port}`));