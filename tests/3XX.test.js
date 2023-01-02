
const { describe, it} = require('node:test');
const { throws, equal, deepEqual} = require("node:assert");

const { _3XX } = require("../");
const { InvalidStatusCode, NoStatusCodeProvided } = require('../core/HTTPStatusCodeError');

describe("Creates a HTTP Status structure for 1XX status codes" , () => {
 
  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _3XX({
      statusCode: 104,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("Should throw an error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => new _3XX({
      statusCode: 600,
      cause: "Server received request headers",
    })

    throws(exercise, expected);
  })

  it("class should correctly serialize to a JSON object", () => {
    const expected = {
      statusCode: 300,
      message: "Multiple Choices",
      cause: "multiple options for the resource",
      metadata: {
        post_id: "1",
        title: "Post 1",
        content: {
          header: "First Post",
          body: "This is my first post."
        }
      },
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-300"
    }

    const request300 = new _3XX({
      statusCode: 300,
      cause: "multiple options for the resource",
      metadata: {
        post_id: "1",
        title: "Post 1",
        content: {
          header: "First Post",
          body: "This is my first post."
        }
      },
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-300"
    })

    deepEqual(request300, expected)
  })

  it("Should throw an NoStatusCodeProvided error if no http status code or response is provided", () => {
    const expected = NoStatusCodeProvided

    const noResponse = () =>  new _3XX({});
    const noStatusCode = () =>  new _3XX({ cause: "The server has received the request headers" });

    throws(noResponse, expected);
    throws(noStatusCode, expected);
  })

  it("Should return a 300 response", () => {
    const response = new _3XX({ statusCode: 300 });

    equal(response.statusCode, 300);
    equal(response.message, "Multiple Choices");
  })

  it("Should return a cause if it's provided", () => {
    const response = new _3XX({
      statusCode: 300,
      cause: "The server has received the request headers"
    })

    equal(response.cause, "The server has received the request headers")
  })

  it("Should return metadata if it's provided", () => {
    const response = new _3XX({
      statusCode: 300,
      metadata: {
        requestTimestamp: "1672617602"
      }
    })

    deepEqual(response.metadata, {
      requestTimestamp: "1672617602"
    })
  })

  it("Should return a reference if it's provided", () => {
    const response = new _3XX({
      statusCode: 300,
      reference: "#http-300"
    })

    equal(response.reference, "#http-300")
  })

  it("Should return a requestId if it's provided", () => {
    const response = new _3XX({
      statusCode: 300,
      requestId: "456"
    })

    equal(response.requestId, "456");
  })

})