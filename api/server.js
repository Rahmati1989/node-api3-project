const express = require('express')
const usersRouter = require("./users/users-router")
const {logger} = require("./middleware/middleware")


const server = express()

// remember express by default cannot parse JSON in request bodies
server.use(logger)
server.use(express.json())
// global middlewares and routes need to be connected here
server.use(usersRouter)
server.get("/",(req, res) =>{
res.send({message: "Hello Wold"})
})

server.use((err, req, res, next) => {
  console.log(err) 
  res.status(500).json({
      message: "Something Went Wrong, Please Try Again Later"
  })
})

module.exports = server
