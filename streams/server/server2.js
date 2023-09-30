import http from "node:http";

const users = [];

const server = http.createServer(async (request, response) => {
  const buffer = [];

  for await (const chunck of request) {
    buffer.push(chunck);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffer).toString());
  } catch (error) {
    request.body = null;
  }

  if (request.method === "POST") {
    const { name } = request.body;

    users.push({
      name,
    });

    return response.writeHead(200).end();
  }

  if (request.method === "GET") {
    return response
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }
});

server.listen(3335);
