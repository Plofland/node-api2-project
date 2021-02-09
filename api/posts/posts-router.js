// implement your posts router here
const postFunctions = require('./posts-model');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  postFunctions
    .find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The posts information could not be retrieved' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  postFunctions
    .findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The post information could not be retrieved' });
    });
});

router.post('/', async (req, res) => {
  const newPost = req.body;
  if (!newPost.title || !newPost.content) {
    res
      .status(401)
      .json({ message: 'Please provide title and contents for the post' });
  } else {
    try {
      const newlyCreatedPost = await postFunctions.insert(newPost);
      res.status(201).json(newlyCreatedPost);
    } catch (error) {
      res.status(500).json({
        message: 'There was an error while saving the post to the database'
      });
    }
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (!changes.title || !changes.contents) {
    res
      .status(400)
      .json({ message: 'Please provide title and contents for the post' });
  } else {
    try {
      const updatedPost = await postFunctions.update(id, changes);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'The post information could not be modified' });
    }
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  postFunctions
    .remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(() =>
      res.status(500).json({ message: 'The post could not be removed' })
    );
});

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  postFunctions
    .findCommentById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'The comments information could not be retrieved' });
    });
});

module.exports = router;
