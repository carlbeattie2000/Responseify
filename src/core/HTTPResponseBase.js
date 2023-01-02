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

  async createRequestId() {
    this.requestId = await generateUniqueId();
  }
}

module.exports = HTTPResponseBase;