import http from 'node:http'

const users = []

const server = http.createServer((request, response) => {

  if(request.method === 'GET') {
    return response.setHeader(
      'Content-type','application/json'
    ).end(JSON.stringify(users))
  }

  if(request.method === 'POST') {
    let body = []
    request.on('data', chunck => {
      body.push(chunck)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
    })

    console.log(body)

    const user = {
      "name": "Alexandre Bekor"
    }

    users.push(user)
    return response.writeHead(201).end()
  }

  return response.writeHead(404).end()
})

server.listen(3000)