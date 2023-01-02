const HTTPResponseBase = require("../core/HTTPResponseBase");
const { InvalidStatusCode, NoStatusCodeProvided } = require("../core/HTTPStatusCodeError");

const clientErrorsStatusCodeMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "Misdirected Redirect",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons"
}

class _4XX extends HTTPResponseBase {
  constructor(options = {statusCode: "", cause: "", metadata: {}, reference: "", requestId: ""}) {
    if (!options.statusCode) throw new NoStatusCodeProvided

    if (!clientErrorsStatusCodeMessages.hasOwnProperty(options.statusCode)) {
      throw new InvalidStatusCode(options);
    }

    options.message = clientErrorsStatusCodeMessages[options.statusCode];

    super({
      ...options
    })
  }
}

module.exports = _4XX;