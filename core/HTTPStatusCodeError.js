class InvalidStatusCode extends Error {
  constructor(options) {
    super("Invalid HTTP status code " + options.statusCode)

    this.validStatusCodes = ["1XX", "2XX", "3XX", "4XX", "5XX"];
    this.reference = "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"
  }
}

class NoStatusCodeProvided extends Error {
  constructor() {
    super("No HTTP status code provided")

    this.validStatusCodes = ["1XX", "2XX", "3XX", "4XX", "5XX"];
    this.reference = "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes"
  }
}

module.exports = {
  InvalidStatusCode,
  NoStatusCodeProvided
}