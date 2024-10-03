// app.js
const { createClient } = require('@supabase/supabase-js');

// Kết nối với Supabase
const supabaseUrl = 'https://zqkanezgpzzwfxrjuwad.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxa2FuZXpncHp6d2Z4cmp1d2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3NDQyNjcsImV4cCI6MjA0MzMyMDI2N30.JbuVReVyiJc4tC5klIN9E0Yn36ol68U4IduiUeBqUXw';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 10000; // Use PORT from Render

app.use(cors({
    origin: 'https://myweb-fe.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Đăng ký người dùng
app.post('/register', async (req, res) => {
    const { username, password, dob, image } = req.body;
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, dob, image }]);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json(data);
    }
});

// Đăng nhập người dùng
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password);

    if (error || data.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
    } else {
        res.json(data[0]);
    }
});

// Quản lý bài viết
app.post('/posts', async (req, res) => {
    const { title, content, username, status, type, image, imgPost } = req.body;
    const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content, username, status, type, image, imgPost }]);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json(data);
    }
});

app.get('/posts', async (req, res) => {
    const { data, error } = await supabase
        .from('posts')
        .select('*');

    if (error) {
        res.status(500).json({ message: error.message });
    } else {
        res.json(data);
    }
});

app.get('/posts/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', req.params.id);

    if (error || data.length === 0) {
        res.status(404).json({ message: 'Post not found' });
    } else {
        res.json(data[0]);
    }
});

app.put('/posts/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('posts')
        .update(req.body)
        .eq('id', req.params.id);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json(data);
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', req.params.id);

    if (error) {
        res.status(404).json({ message: 'Post not found' });
    } else {
        res.json({ message: 'Post deleted' });
    }
});

// Quản lý lượt thích
app.post('/posts/:id/like', async (req, res) => {
    const { username } = req.body;
    const { data, error } = await supabase
        .from('likes')
        .insert([{ idPost: req.params.id, username }]);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json(data);
    }
});

app.post('/posts/:id/unlike', async (req, res) => {
    const { username } = req.body;
    const { data, error } = await supabase
        .from('likes')
        .delete()
        .eq('idPost', req.params.id)
        .eq('username', username);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json({ message: 'Unliked post' });
    }
});

app.get('/posts/:id/likes', async (req, res) => {
    const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('idPost', req.params.id);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json(data);
    }
});

// Quản lý người dùng
app.put('/users/:username', async (req, res) => {
    const { username } = req.params;
    const { data, error } = await supabase
        .from('users')
        .update(req.body)
        .eq('username', username);

    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        res.json(data);
    }
});

app.get('/users', async (req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        res.status(500).json({ message: error.message });
    } else {
        res.json(data);
    }
});

app.get('/users/:username', async (req, res) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', req.params.username);

    if (error || data.length === 0) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(data[0]);
    }
});
