
const { describe, it} = require('node:test');
const { throws, equal, deepEqual} = require("node:assert");

const { HTTPResponseBuilder } = require("..");
const { InvalidStatusCode, NoStatusCodeProvided } = require('../core/HTTPStatusCodeError');

describe("Bundles all the status code classes together, and creates the right one from the passed status code" , () => {

  it("Should throw an InvalidStatusCode error as status code is out of range of supported values", () => {
    const expected = InvalidStatusCode

    const exercise = () => HTTPResponseBuilder({ statusCode: 600 });

    throws(exercise, expected);
  })

  it("Should throw an InvalidStatusCode error if no options or status code is provided", () => {
    const expected = NoStatusCodeProvided

    const noPassedOptions = () => HTTPResponseBuilder();
    const noStatusCode = () => HTTPResponseBuilder({ cause: "All good" })

    throws(noPassedOptions, expected);
    throws(noStatusCode, expected);
  })

  it("class should correctly return a class that can be serialized to a JSON object", () => {
    const expected = {
      statusCode: 204,
      message: "No Content",
      cause: "The server successfully processed the request",
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-204"
    }

    const request204 = HTTPResponseBuilder({
      statusCode: 204,
      cause: "The server successfully processed the request",
      reference: "https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_success",
      requestId: "#http-204"
    })

    deepEqual(request204, expected)
  })

  it("Should return metadata if it's provided", () => {
    const response = HTTPResponseBuilder({
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
    const response = HTTPResponseBuilder({
      statusCode: 200,
      reference: "#http-200"
    })

    equal(response.reference, "#http-200")
  })

  it("Should return a requestId if it's provided", () => {
    const response = HTTPResponseBuilder({
      statusCode: 200,
      requestId: "456"
    })

    equal(response.requestId, "456");
  })
})