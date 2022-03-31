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