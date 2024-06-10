// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = require('./comments');

http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    // Get comments
    if (pathname === '/api/comments') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else {
        // Read file
        fs.createReadStream(path.resolve(__dirname, 'index.html')).pipe(res);
    }
}).listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

// Path: index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <ul id="comments"></ul>
    <script>
        fetch('/api/comments')
            .then(res => res.json())
            .then(comments => {
                const commentsEl = document.getElementById('comments');
                comments.forEach(comment => {
                    const li = document.createElement('li');
                    li.textContent = comment.text;
                    commentsEl.appendChild(li);
                });
            });
    </script>
</body>
</html>

// Path: comments.js
module.exports = [
    { text: 'Comment 1' },
    { text: 'Comment 2' },
    { text: 'Comment 3' },
    { text: 'Comment 4' }
];

// Output
// Server is running on http://localhost:3000/
// Open the browser and go to http://localhost:3000/ to see the comments

// You can also use express to create a server
// Path: app.js
const express = require('express');
const comments = require('./comments');

const app = express();
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

// Output
// Server is running on http://localhost:3000