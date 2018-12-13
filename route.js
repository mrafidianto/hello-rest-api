const handlers = require('./handler')

// Define a request router
const route = {
  "hello" : handlers.hello,
  "notFound" : handlers.notFound
};

module.exports = route