import http from "node:http";
import { json } from "../middleware/json.js";

const users = [];

const server = http.createServer(async (request, response) => {
  await json(request, response);

  if (request.method === "POST") {
    const { name } = request.body;

    users.push({
      name,
    });

    return response.writeHead(200).end();
  }

  if (request.method === "GET") {
    return response.end(JSON.stringify(users));
  }
});

server.listen(3335);
