const HTTPResponseBase = require("./HTTPResponseBase");

class HTTPErrorResponseBase extends HTTPResponseBase {
  constructor(
    options={ statusCode: "", cause: "", metadata: {}, reference: "", requestId: "" },
    error={ description: "", errors: [], useTimestamp: false }) {
      super({...options})

      this.description = error.description;
      this.errors = error.errors;

      if (useTimestamp) this.timestamp = Date.now();
    }
}