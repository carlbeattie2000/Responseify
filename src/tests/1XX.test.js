
const { describe, it} = require('node:test');
const { throws, equal, deepEqual} = require("node:assert");

const { _1XX } = require("../");
const { InvalidStatusCode, NoStatusCodeProvided } = require('../core/HTTPStatusCodeError');

describe("Creates a HTTP Status structure for 1XX status codes" , () => {
 
  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _1XX({
      statusCode: 104,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _1XX({
      statusCode: 600,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("class should correctly serialize to a JSON object", () => {
    const expected = {
      statusCode: 100,
      message: "Continue",
      cause: "Server received the request headers",
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#1xx_informational_response",
      requestId: "#http-100"
    }

    const request100 = new _1XX({
      statusCode: 100,
      cause: "Server received the request headers",
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#1xx_informational_response",
      requestId: "#http-100"
    })

    deepEqual(request100, expected)
  })

  it("Should throw an NoStatusCodeProvided error if no http status code or response is provided", () => {
    const expected = NoStatusCodeProvided

    const noResponse = () =>  new _1XX({});
    const noStatusCode = () =>  new _1XX({ cause: "The server has received the request headers" });

    throws(noResponse, expected);
    throws(noStatusCode, expected);
  })

  it("Should return a 100 response", () => {
    const response = new _1XX({ statusCode: 100 });

    equal(response.statusCode, 100);
    equal(response.message, "Continue");
  })

  it("Should return a cause if it's provided", () => {
    const response = new _1XX({
      statusCode: 100,
      cause: "The server has received the request headers"
    })

    equal(response.cause, "The server has received the request headers")
  })

  it("Should return metadata if it's provided", () => {
    const response = new _1XX({
      statusCode: 100,
      metadata: {
        requestTimestamp: "1672617602"
      }
    })

    deepEqual(response.metadata, {
      requestTimestamp: "1672617602"
    })
  })

  it("Should return a reference if it's provided", () => {
    const response = new _1XX({
      statusCode: 100,
      reference: "#http-100"
    })

    equal(response.reference, "#http-100")
  })

  it("Should return a requestId if it's provided", () => {
    const response = new _1XX({
      statusCode: 100,
      requestId: "456"
    })

    equal(response.requestId, "456");
  })

})