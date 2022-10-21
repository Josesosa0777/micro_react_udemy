const express = require('express');
const bodyParser = require('body-parser'); // to make sure that whenever a user sends us some JSON data in the body, the request actually gets parsed.
const { randomBytes } = require('crypto');
 
const app = express();

app.use(bodyParser.json());

// Object to store avery post
const posts = {}
 
app.get('/posts', (req, res) => {
   res.send(posts);
})

 
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex'); // 4 bytes random
    const { title } = req.body;
  
    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
 })
  
 app.listen(4000, () => {
    console.log('Listening on 4000');
 })
 