const HTTPResponseBase = require("../core/HTTPResponseBase");
const { InvalidStatusCode, NoStatusCodeProvided } = require("../core/HTTPStatusCodeError");

const redirectionStatusCodeMessages = {
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  310: "Too Many Redirects"
}

class _3XX extends HTTPResponseBase {
  constructor(options = {statusCode: "", cause: "", metadata: {}, reference: "", requestId: ""}) {
    if (!options.statusCode) throw new NoStatusCodeProvided

    if (!redirectionStatusCodeMessages.hasOwnProperty(options.statusCode)) {
      throw new InvalidStatusCode(options);
    }
    
    options.message = redirectionStatusCodeMessages[options.statusCode];

    super({
      ...options
    })
  }
}

module.exports = _3XX;