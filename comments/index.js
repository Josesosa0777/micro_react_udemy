const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
 
const app = express();
app.use(bodyParser.json());
 
const commentsByPostId = {};
 
app.get('/posts/:id/comments', (req, res) => {
   res.send(commentsByPostId[req.params.id] || []);
})
 
app.post('/posts/:id/comments', (req, res) => {
   const commentId = randomBytes(4).toString('hex');
   const { content } = req.body;
 
   // returns undefined if we never had a comment,
   // so, we wat to prevent it by returning an empty array if that happens:
   const comments = commentsByPostId[req.params.id] || []
 
   comments.push({ id: commentId, content })

   // And I'll make sure that I assign this comments array back to the given post inside of our comments by post ID object.
   commentsByPostId[req.params.id] = comments
 
   res.status(201).send(comments);
})
 
app.listen(4001, () => {
   console.log('Listening on 4001');
});
