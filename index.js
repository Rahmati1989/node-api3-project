// require your server and launch it
const server = require("./api/server")

const port = process.env.PORT || 8080

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})