const http = require('http');
const config = require('./config')

const httpServer = http.createServer((req, res) => {
  res.end("Hello World !")
})

const port = 3000
httpServer.listen(config.httpPort, () => {
  console.log("the server is run on port ",config.httpPort)
})