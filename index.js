const { HTTPResponseBuilder } = require("./src/");

const http = require('http');

const requestListener = function (req, res) {
  const response = HTTPResponseBuilder({
    statusCode: 200,
    metadata: {
      username: "carl212"
    }
  })

  response.send(res);
}

const server = http.createServer(requestListener);
server.listen(2000);