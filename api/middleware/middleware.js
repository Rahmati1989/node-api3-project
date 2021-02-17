const Users = require("../users/users-model")

function logger(req, res, next) {
  // DO YOUR MAGIC
  const time = new Date().toISOString()
  console.log(`[${time}] ${req.ip} ${req.method} ${req.url}`)
  next()
}


  
  function validateUserId() {
    // DO YOUR MAGIC
  return (req, res, next) => {
    users.getById(req.params.id)
      .then ((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({message: "user not found"});
        }
      })
      .catch ((error) => {
        console.log(error);
      })
  }
}

function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
  if(!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}
}

function validatePost() {
  // DO YOUR MAGIC HERE 
  return (req, res, next) => {
    if(!req.body) {
      res.status(400).json({ message: "missing post data" })
    } else if(!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      res.postEdit = req.body
      next()
    }
  }
}
// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}