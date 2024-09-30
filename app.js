// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const authLogic = require('./authLogic');
const postLogic = require('./postLogic');
const likeLogic = require('./likeLogic');
const port = process.env.PORT || 5000; // Use PORT from Render

app.use(cors({ origin: 'https://your-frontend-url.render.com' }));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Đăng ký
app.post('/register', (req, res) => {
    const { username, password, dob, image } = req.body;
    const result = authLogic.register(username, password, dob,image);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json(result);
    }
});

// Đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = authLogic.login(username, password);
    if (result.success) {
        res.json(result);
    } else {
        res.status(401).json(result);
    }
});
app.post('/forgot-password', (req, res) => {
    const { username } = req.body;
    const result = authLogic.resetPassword(username);
    if (result.success) {
        res.json(result);
    } else {
        res.status(404).json(result);
    }
});
// Quản lý bài viết
app.post('/posts', (req, res) => {
    const { title, content, username, status, type, image, imgPost } = req.body;
    const newPost = postLogic.createPost(title, content, username, status, type, image, imgPost);
    res.json(newPost);
});

app.get('/posts', (req, res) => {
    res.json(postLogic.getPosts());
});

app.get('/likes', (req, res) => {
    res.json(likeLogic.getLikes());
});

app.get('/posts/:id', (req, res) => {
    const post = postLogic.getPostById(+req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.put('/posts/:id', (req, res) => {
    const updatedPost = postLogic.updatePost(+req.params.id, req.body);
    if (updatedPost) {
        res.json(updatedPost);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.delete('/posts/:id', (req, res) => {
    const deletedPost = postLogic.deletePost(+req.params.id);
    if (deletedPost) {
        res.json({ message: 'Post deleted' });
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

// Like bài viết
app.post('/posts/:id/like', (req, res) => {
    const { username } = req.body;
    const result = likeLogic.likePost(+req.params.id, username);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json(result);
    }
});

// Unlike bài viết
app.post('/posts/:id/unlike', (req, res) => {
    const { username } = req.body;
    const result = likeLogic.unlikePost(+req.params.id, username);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json(result);
    }
});

app.get('/posts/:id/likes', (req, res) => {
    const likes = likeLogic.getLikesByPost(+req.params.id);
    res.json(likes);
});

app.get('/posts/:id/unlikes', (req, res) => {
    const unlikes = likeLogic.getLikesByPost(+req.params.id);
    res.json(likes);
});

app.put('/users/:username', (req, res) => {
    const { username } = req.params;
    const updatedData = req.body;

    const result = authLogic.updateUser(username, updatedData);

    if (result.success) {
        res.json(result);
    } else {
        res.status(404).json(result);
    }
});

app.get('/users', (req, res) => {
    const users = authLogic.getAllUsers();
    res.json(users);
});

// Get a user by username
app.get('/users/:username', (req, res) => {
    const user = authLogic.getUserByUsername(req.params.username);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});