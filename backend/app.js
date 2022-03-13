// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const cors = require('cors');

// const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');
// const likeRoutes = require('./routes/like');
// const commentRoutes = require('./routes/comment');
// const readPost = require('./routes/readPost');

// const db = require('./models');
// const app = express();
// app.use(cors());
// app.use(express.json())

// db.authenticate()
//     .then(() => console.log('Database connected...'))
//     .catch(err => console.log('Error: ' + err));

// // app.get('/', (req, res) => res.send('INDEX'));
// const PORT = process.env.PORT || 5000;

// // Routes
// app.use('/api/posts', postRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/like', likeRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/readPost', readPost);

// // Simple front end for development
// app.use(express.static('public'));

// app.listen(PORT, console.log(`Server is listening at http://localhost:${PORT}/`));

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./models");
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000;


app.use(cors());

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');
const readPostRoutes = require('./routes/readPost');

app.use(express.json())

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/readPosts', readPostRoutes);

app.use('/media', express.static(path.join(__dirname, 'media')));

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`listening at: http://localhost:${PORT}`);
    })
})