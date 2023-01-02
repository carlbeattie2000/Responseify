const HTTPResponseBase = require("../core/HTTPResponseBase");
const { InvalidStatusCode, NoStatusCodeProvided } = require("../core/HTTPStatusCodeError");

const successStatusCodeMessages = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status"
}

class _2XX extends HTTPResponseBase {
  constructor(options = {statusCode: "", cause: "", metadata: {}, reference: "", requestId: ""}) {
    if (!options.statusCode) throw new NoStatusCodeProvided

    if (!successStatusCodeMessages.hasOwnProperty(options.statusCode)) {
      throw new InvalidStatusCode(options);
    }

    options.message = successStatusCodeMessages[options.statusCode];

    super({
      ...options
    })
  }
}

module.exports = _2XX;