const HTTPResponseBase = require("../core/HTTPResponseBase");
const { InvalidStatusCode, NoStatusCodeProvided } = require("../core/HTTPStatusCodeError");

const informationalStatusCodeMessages = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints"
}

class _1XX extends HTTPResponseBase {
  constructor(options = {statusCode: "", cause: "", metadata: {}, reference: "", requestId: ""}) {

    if (!options.statusCode) throw new NoStatusCodeProvided

    if (!informationalStatusCodeMessages.hasOwnProperty(options.statusCode)) {
      throw new InvalidStatusCode(options);
    }

    options.message = informationalStatusCodeMessages[options.statusCode];

    super({
      ...options
    })
  }
}

module.exports = _1XX;