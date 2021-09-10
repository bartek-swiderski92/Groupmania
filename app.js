const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const {
    Sequelize
} = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize('groupmania', 'root', 'SQL098', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));


const app = express();

app.get('/', (req, res) => res.send('INDEX'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));