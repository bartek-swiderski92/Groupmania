const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const likeRoutes = require('./routes/like');

const db = require('./config/database');
const app = express();
app.use(cors());
app.use(express.json())

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// app.get('/', (req, res) => res.send('INDEX'));
const PORT = process.env.PORT || 5000;

// Routes
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/like', likeRoutes);

// Simple front end for development
app.use(express.static('public'));

app.listen(PORT, console.log(`Server is listening at http://localhost:${PORT}/`));