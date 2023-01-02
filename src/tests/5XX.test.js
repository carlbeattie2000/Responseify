
const { describe, it} = require('node:test');
const { throws, equal, deepEqual} = require("node:assert");

const { _5XX } = require("../");
const { InvalidStatusCode, NoStatusCodeProvided } = require('../core/HTTPStatusCodeError');

describe("Creates a HTTP Status structure for 1XX status codes" , () => {
 
  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _5XX({
      statusCode: 104,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _5XX({
      statusCode: 600,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("class should correctly serialize to a JSON object", () => {
    const expected = {
      statusCode: 500,
      error: true,
      message: "Internal Server Error",
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
      requestId: "#http-500"
    }

    const request500 = new _5XX({
      statusCode: 500,
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
      requestId: "#http-500"
    })

    deepEqual(request500, expected)
  })

  it("Should throw an NoStatusCodeProvided error if no http status code or response is provided", () => {
    const expected = NoStatusCodeProvided

    const noResponse = () =>  new _5XX({});
    const noStatusCode = () =>  new _5XX({ cause: "The server has received the request headers" });

    throws(noResponse, expected);
    throws(noStatusCode, expected);
  })

  it("Should return a 500 response", () => {
    const response = new _5XX({ statusCode: 500 });

    equal(response.statusCode, 500);
    equal(response.message, "Internal Server Error");
  })

  it("Should return a cause if it's provided", () => {
    const response = new _5XX({
      statusCode: 500,
      cause: "The server cannot or will not process the request"
    })

    equal(response.cause, "The server cannot or will not process the request")
  })

  it("Should return metadata if it's provided", () => {
    const response = new _5XX({
      statusCode: 500,
      metadata: {
        requestTimestamp: "1672617602"
      }
    })

    deepEqual(response.metadata, {
      requestTimestamp: "1672617602"
    })
  })

  it("Should return a reference if it's provided", () => {
    const response = new _5XX({
      statusCode: 500,
      reference: "#http-500"
    })

    equal(response.reference, "#http-500")
  })

  it("Should return a requestId if it's provided", () => {
    const response = new _5XX({
      statusCode: 500,
      requestId: "456"
    })

    equal(response.requestId, "456");
  })

})