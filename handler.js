// Define a handlers
const handlers = {};

// sample handlers
handlers.ping = (data, callback) => {
  // Callback a http status, and a payload object
  callback(200, { 'msg': 'pong!' });
}

handlers.hello = (data, callback) => {
  // Callback a http status, and a payload object
  const payload = data.payload

  if(payload.length > 0) {
    const jsonPayload = JSON.parse(payload)
    if(jsonPayload.hasOwnProperty("name") && jsonPayload.name != ""){
      callback(200, { "msg": "Hi "+jsonPayload.name+", Welcome to simple rest api !" });
    }
  }
  callback(200, { 'msg': 'Hi, Welcome to simple rest api !' });
}

// Not Found handler
handlers.notFound = (data, callback) => {
  callback(404, {'msg':"request for path /" + data.trimmedPath + " is not found !"});
}

module.exports = handlers