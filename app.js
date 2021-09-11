const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user')

//Database
const db = require('./config/database')

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));


const app = express();

app.get('/', (req, res) => res.send('INDEX'))

// Post routes
app.use('/posts', require('./routes/posts.js'))

const PORT = process.env.PORT || 5000;

app.use('/users', userRoutes)

app.listen(PORT, console.log(`Server started on port ${PORT}`));