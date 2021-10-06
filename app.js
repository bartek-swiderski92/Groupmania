const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/posts')

//Database
const db = require('./config/database')

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// APP
const app = express();
app.get('/', (req, res) => res.send('INDEX'))
const PORT = process.env.PORT || 5000;

// Routes
app.use('/posts', postRoutes)
app.use('/users', userRoutes)

app.listen(PORT, console.log(`Server is listening at http://localhost:${PORT}/`));