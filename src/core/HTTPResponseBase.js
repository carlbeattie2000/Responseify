const { NoStatusCodeProvided } = require("./HTTPStatusCodeError");
const generateUniqueId = require("./uniqueReferenceId");

class HTTPResponseBase {
  statusCode;

  message;

  constructor(response) {
    if (!response || !response.statusCode) {
      throw new NoStatusCodeProvided
    }

    this.statusCode = response.statusCode;

    if (response.statusCode >= 400) {
      this.error = true;
    }

    this.message = response.message || "";

    if (response.cause) this.cause = response.cause;

    if (response.metadata) this.metadata = response.metadata;

    if (response.reference) this.reference = response.reference;

    if (response.requestId) this.requestId = response.requestId;
  }

  createRequestId() {
    this.requestId = generateUniqueId();
  }

  // Default node HTTP server
  send(res) {
    res.statusCode = this.statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(this));
  }

  expressSend(res) {
    res.status(this.statusCode).json(this);
  }
}

module.exports = HTTPResponseBase;