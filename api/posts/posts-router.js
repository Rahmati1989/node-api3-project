const express = require('express');
const Posts = require("./posts-model")
const router = express.Router();

router.get('/', (req, res) => {
  // DO YOUR MAGIC
  Posts.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

router.get('/:id', (req, res) => {
  // DO YOUR MAGIC
  Posts.getById(req.params.id)
  .then(posts => {
     res.status(200).json(posts);
    }
  )
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error:"The posts could not be retrieved."
    });
  });
});

// do not forget to export the router

module.exports = router
