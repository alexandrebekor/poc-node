import http from "node:http";
import { Transform } from "node:stream";

class NextData extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;
    const buffer = Buffer.from(String(transformed));

    console.log(transformed);

    callback(null, buffer);
  }
}

// request => Readdable Stream
// response => Writable Stream

const server = http.createServer(async (request, response) => {
  // const transform = new NextData()
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers).toString();
  console.log(body);
  return response.end(body);
});

server.listen(3333);
