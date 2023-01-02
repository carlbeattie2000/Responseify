<h1 align="center">⚡ Responseify ⚡</h1>

<p align="center"> <code>Responseify</code> is a lightweight Node.js library that <b> provides a structured and consistent way to generate HTTP responses. <br><br> With just a few lines of code, you can easily create professional and standardized responses for your API or web application. Whether you're building a new project or looking to improve the reliability of your existing code, Responseify has you covered.
</p>

____

## Installation

```bash
npm install responseify
```

**OR**

```bash
yarn add responseify
```

## Usage

```js
// This example is created using express

const express = require('express');

const { HTTPResponseBuilder } = require("responseify"); // Require the HTTPResponseBuilder function from the responseify library

const posts = [
  {
    id: 1,
    content: "This is post 1",
    author: "poster1"
  },
  {
    id: 2,
    content: "This is post 2",
    author: "poster2"
  }
]

const app = express(); // Create an express app

app.get("/posts", async (req, res) => {

  const response = HTTPResponseBuilder({ // Use the HTTPResponseBuilder function to generate a standardized HTTP response object
    statusCode: 200, // Set the HTTP status code to 200 (OK)
    cause: 'Everything is working.', // Provide a brief description of the cause of the response
    metadata: posts, // Include the posts as metadata in the response
  })

  res.status(response.statusCode).json(response);
})

app.listen(3000);
```
**RESPONSE**

```json
{
  "statusCode": 200,
  "message": "OK",
  "cause": "Everything is working.",
  "metadata": [
    {
      "id": 1,
      "content": "This is post 1",
      "author": "poster1"
    },
    {
      "id": 2,
      "content": "This is post 2",
      "author": "poster2"
    }
  ]
}
```

## Documentation

You can use the send function to quickly and easily send a response to the user. To use it, simply call the ```.send()``` on the response object.

```js
const response = HTTPResponseBuilder({
  "statusCode": 200,
  "metadata": {
    "post": {
      "author": "poster1"
    }
  }
});

// Node HTTP server
response.send(res);

// Express server
response.expressSend(res);
```

Use the ```.createRequestId()``` to generate a unique request id for your response.
```js
const response = HTTPResponseBuilder({
  "statusCode": 200,
  "metadata": {
    "post": {
      "author": "poster1"
    }
  }
});

response.createRequestId();
```

If you only need to use certain ranges of status codes (e.g., 2xx success codes or 4xx client error codes), you can use tree shaking to access specific ranges of status codes like this:
```js
const { _2XX } = require("responseify");

const response = new _2XX({
  statusCode: 200,
  metadata: {
    username: "carl212"
  }
})
```

Responseify supports all HTTP status codes listed on the [HTTP status codes Wikipedia page](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
