import http from "node:http";
import middleware from "./middleware.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

const server = http.createServer(async (request, response) => {
  await middleware(request, response);
  const { method } = request;

  if (method === "POST") {
    const { name } = request.body;

    const user = {
      id: randomUUID(),
      name,
    };

    database.insert("users", user);
    return response.writeHead(201).end();
  }

  if (method === "GET") {
    const users = database.select("users");
    return response.writeHead(200).end(JSON.stringify(users));
  }
});

server.listen(3335);
