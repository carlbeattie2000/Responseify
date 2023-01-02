
const { describe, it} = require('node:test');
const { throws, equal, deepEqual} = require("node:assert");

const { _2XX } = require("../");
const { InvalidStatusCode, NoStatusCodeProvided } = require('../core/HTTPStatusCodeError');

describe("Creates a HTTP Status structure for 1XX status codes" , () => {
 
  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _2XX({
      statusCode: 104,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _2XX({
      statusCode: 600,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("class should correctly serialize to a JSON object", () => {
    const expected = {
      statusCode: 200,
      message: "OK",
      cause: "All good",
      metadata: {
        post_id: "1",
        title: "Post 1",
        content: {
          header: "First Post",
          body: "This is my first post."
        }
      },
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-200"
    }

    const request200 = new _2XX({
      statusCode: 200,
      cause: "All good",
      metadata: {
        post_id: "1",
        title: "Post 1",
        content: {
          header: "First Post",
          body: "This is my first post."
        }
      },
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-200"
    })

    deepEqual(request200, expected)
  })

  it("Should throw an NoStatusCodeProvided error if no http status code or response is provided", () => {
    const expected = NoStatusCodeProvided

    const noResponse = () =>  new _2XX({});
    const noStatusCode = () =>  new _2XX({ cause: "The server has received the request headers" });

    throws(noResponse, expected);
    throws(noStatusCode, expected);
  })

  it("Should return a 200 response", () => {
    const response = new _2XX({ statusCode: 200 });

    equal(response.statusCode, 200);
    equal(response.message, "OK");
  })

  it("Should return a cause if it's provided", () => {
    const response = new _2XX({
      statusCode: 200,
      cause: "The server has received the request headers"
    })

    equal(response.cause, "The server has received the request headers")
  })

  it("Should return metadata if it's provided", () => {
    const response = new _2XX({
      statusCode: 200,
      metadata: {
        requestTimestamp: "1672617602"
      }
    })

    deepEqual(response.metadata, {
      requestTimestamp: "1672617602"
    })
  })

  it("Should return a reference if it's provided", () => {
    const response = new _2XX({
      statusCode: 200,
      reference: "#http-200"
    })

    equal(response.reference, "#http-200")
  })

  it("Should return a requestId if it's provided", () => {
    const response = new _2XX({
      statusCode: 200,
      requestId: "456"
    })

    equal(response.requestId, "456");
  })

})