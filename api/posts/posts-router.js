// implement your posts router here
const Post = require('./posts-model');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  Post.find(req)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});
// router.get('/:id', (req, res) => {});
// router.post('/', (req, res) => {});
// router.put('/:id', (req, res) => {});
// router.delete('/:id', (req, res) => {});
// router.get('/:id/comments', (req, res) => {});

module.exports = router;
