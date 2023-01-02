
const { describe, it} = require('node:test');
const { throws, equal, deepEqual} = require("node:assert");

const { _4XX } = require("../");
const { InvalidStatusCode, NoStatusCodeProvided } = require('../core/HTTPStatusCodeError');

describe("Creates a HTTP Status structure for 1XX status codes" , () => {
 
  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _4XX({
      statusCode: 104,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _4XX({
      statusCode: 600,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("class should correctly serialize to a JSON object", () => {
    const expected = {
      statusCode: 400,
      error: true,
      message: "Bad Request",
      cause: "The server cannot or will not process the request",
      metadata: {
        post_id: "1",
        title: "Post 1",
        content: {
          header: "First Post",
          body: "This is my first post."
        }
      },
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-400"
    }

    const request400 = new _4XX({
      statusCode: 400,
      cause: "The server cannot or will not process the request",
      metadata: {
        post_id: "1",
        title: "Post 1",
        content: {
          header: "First Post",
          body: "This is my first post."
        }
      },
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-400"
    })

    deepEqual(request400, expected)
  })

  it("Should throw an NoStatusCodeProvided error if no http status code or response is provided", () => {
    const expected = NoStatusCodeProvided

    const noResponse = () =>  new _4XX({});
    const noStatusCode = () =>  new _4XX({ cause: "The server has received the request headers" });

    throws(noResponse, expected);
    throws(noStatusCode, expected);
  })

  it("Should return a 400 response", () => {
    const response = new _4XX({ statusCode: 400 });

    equal(response.statusCode, 400);
    equal(response.message, "Bad Request");
  })

  it("Should return a cause if it's provided", () => {
    const response = new _4XX({
      statusCode: 400,
      cause: "The server cannot or will not process the request"
    })

    equal(response.cause, "The server cannot or will not process the request")
  })

  it("Should return metadata if it's provided", () => {
    const response = new _4XX({
      statusCode: 400,
      metadata: {
        requestTimestamp: "1672617602"
      }
    })

    deepEqual(response.metadata, {
      requestTimestamp: "1672617602"
    })
  })

  it("Should return a reference if it's provided", () => {
    const response = new _4XX({
      statusCode: 400,
      reference: "#http-400"
    })

    equal(response.reference, "#http-400")
  })

  it("Should return a requestId if it's provided", () => {
    const response = new _4XX({
      statusCode: 400,
      requestId: "456"
    })

    equal(response.requestId, "456");
  })

})