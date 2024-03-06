const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const router = express.Router();

router.get('/', async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const users = await Users.get()
  res.status(200).json(users) 
});

router.get('/:id', validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).send(req.validUser)
});

router.post('/', validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const result = await Users.insert(req.body)
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({err})
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const result = await Users.update(req.validUser.id, req.body)
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ mesage: "Internal server error"});
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
