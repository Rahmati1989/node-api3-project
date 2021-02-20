const express = require('express');
const users = require("./users-model");
const {validateUserId, validateUser, validatePost} = require("../middleware/middleware")

const router = express.Router();

router.get('/',validateUser(), (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
    res.send(users.get)
});

router.get('/:id', validateUserId(), (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.send(req.user)
});

router.post('/', validatePost(), (req, res) => {
   // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.add(req.user)
  .then(user => res.status(200).json(user))
  .catch(next)
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.user, req.userEdit)
  .then(user => res.status(200).json(user))
  .catch(next)
});

router.delete('/:id', validateUserId(), (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.update(req.user, req.userEdit)
  .then(user => res.status(200).json(user))
  .catch(next)
});

router.get('/:id/posts', validateUserId(), (req, res) => {
   // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  if(!req.user.posts) {
    res.status(404).json({ message: "User does not have any posts to display"})
  } else {
    res.send(req.user.posts)
  }
});

router.post('/:id/posts', validatePost(), validateUserId(), (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.posts.add(req.postEdit)
  .then(post(res.status(200).json(post)))
  .catch(next)
});

// do not forget to export the router
module.exports = router;
