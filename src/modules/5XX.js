const HTTPResponseBase = require("../core/HTTPResponseBase");
const { InvalidStatusCode, NoStatusCodeProvided } = require("../core/HTTPStatusCodeError");

const serverErrorsStatusCodeMessages = {
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required"
}

class _4XX extends HTTPResponseBase {
  constructor(options = {statusCode: "", cause: "", metadata: {}, reference: "", requestId: ""}) {
    if (!options.statusCode) throw new NoStatusCodeProvided

    if (!serverErrorsStatusCodeMessages.hasOwnProperty(options.statusCode)) {
      throw new InvalidStatusCode(options);
    }
    
    options.message = serverErrorsStatusCodeMessages[options.statusCode];

    super({
      ...options
    })
  }
}

module.exports = _4XX;