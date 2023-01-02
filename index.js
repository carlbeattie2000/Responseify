const { InvalidStatusCode, NoStatusCodeProvided } = require("./core/HTTPStatusCodeError");

const _1XX = require("./modules/1XX");
const _2XX = require("./modules/2XX");
const _3XX = require("./modules/3XX");
const _4XX = require("./modules/4XX");
const _5XX = require("./modules/5XX");

const HTTPModules = {
  "1XX": _1XX,
  "2XX": _2XX,
  "3XX": _3XX,
  "4XX": _4XX,
  "5XX": _5XX
}

const HTTPResponseBuilder = (options = {statusCode: "", cause: "", metadata: {}, reference: "", requestId: ""}) => {
  if (!options || !options.statusCode) {
    throw new NoStatusCodeProvided
  }

  statusCodeBaseString = options.statusCode.toString()[0] + "XX";

  if (!HTTPModules.hasOwnProperty(statusCodeBaseString)) {
    throw new InvalidStatusCode(options);
  }

  return new HTTPModules[statusCodeBaseString](options);
}

module.exports = {
  HTTPResponseBuilder,
  _1XX,
  _2XX,
  _3XX,
  _4XX,
  _5XX
};
