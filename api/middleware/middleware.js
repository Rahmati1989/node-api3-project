const users = require("../users/users-model")

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
      .then ((userId) => {
        if (userId) {
          req.userId = userId;
          next()
        } else {
          res.status(404).json({message: "user not found"})
        }
      })
      .catch ((err) => {
        console.log(err)
      })
  }
}
function validateUser() {
  // DO YOUR MAGIC
  return (req, res, next) => {
    const {user} = req.body
    if(!user) {
        return res.status(404).json({
            errorMessage: "Please provide user data",
       })
    }
    req.user = user
    next()
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