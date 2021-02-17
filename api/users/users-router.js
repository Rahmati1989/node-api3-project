const express = require('express');
const Users = require("./users-model.js");
const Posts = require("../posts/posts-router.js");
const { validateUser, validateUserId } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
     res.status(200).json(users);
    })
    .catch(error => {
          console.log(error);
      res.status(500).json({
        error: "The users information could not be found."
      });
    });
});

router.get('/:id', validateUser, (req, res) => {
   // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id)
    .then(user => {
         res.status(200).json(user);
      }
    )
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error:"The user information could not be retrieved."
      });
    });
});


router.post('/', validateUser(), (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
   Users.insert(req.body)
  .then(user => {
               res.status(201).json(user);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "There was an error while saving the user to the database"})
      })
});

router.put('/:id', validateUser(), validateUserId(), (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
   .then(user => {
       res.status(200).json(user);
     }
 )
  .catch(error => {
     console.log(error);
     res.status(500).json({
       error: "The user information could not be modified."
     });
   });
});

router.delete('/:id', validateUser() , (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
   Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  Users.remove(req.params.id)
  .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The user could not be removed" 
      });
  
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
       res.status(200).json(user);
    }
  )
  .catch(error => {
    // RETURN THE ARRAY OF USER POSTS
    // this needs a middleware to verify user id
    console.log(error);
    res.status(500).json({
      error:"The user information could not be retrieved."
    });
  });
});

router.post('/:id/posts', validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const user = {...req.body, user_id: req.params.id};
  Posts.insert(user)
  .then(post => {
          res.status(201).json(post);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ error: "There was an error while saving the post to the database"})
      })
});



// do not forget to export the router

module.exports = router