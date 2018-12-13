const http = require('http');
const config = require('./config')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder;
const route = require('./route')

const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res)
})

httpServer.listen(config.httpPort, () => {
  console.log("the server is run on port ",config.httpPort)
})

// All the server logic for both http and https server
const unifiedServer = function (req, res) {

  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "") || "/";

  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Get query parameter, if any
  const queryString = parsedUrl.query;

  // GET request header
  const headers = req.headers;

  // Get The payload of request, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += data;
  });

  req.on('end', () => {
    buffer += decoder.end();


    // Choose the handler this request should go to, if not found, use not found handler
    const chosenHandler = typeof (route[trimmedPath]) !== "undefined" ? route[trimmedPath] : route.notFound

    // Construct the data object to send to the hanler
    const data = {
      "trimmedPath": trimmedPath,
      "method": method,
      "queryString": queryString,
      "headers": headers,
      "payload": buffer
    }

    // Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the statusCode called back by the handler or default to 200
      statusCode = typeof (statusCode) === "number" ? statusCode : 200;

      // Use the payload called back by the handler, or default to an empty object
      payload = typeof (payload) == "object" ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.writeHead(statusCode, {"Content-Type": "application/json"})
      res.end(payloadString);

      // Log the request path
      console.log("Returning this response :", statusCode, payloadString)
    })
  });
};
