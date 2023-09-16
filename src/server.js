import http from 'node:http'

const users = []

const server = http.createServer((request, response) => {

  if(request.method === 'GET') {
    return response.writeHead(200).end(JSON.stringify({
      "name": "Alexandre Bekor"
    }))
  }

  if(request.method === 'POST') {


    return response.writeHead(201).end()
  }

  return response.writeHead(400).end()
})

server.listen(3000)