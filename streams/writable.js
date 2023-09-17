import { Readable, Writable } from 'node:stream'

class OneHundredStream extends Readable {
  index = 1

  // obrigatoriamente temos a função de leitura
  _read() {
    const i = this.index++

   setTimeout(() => {
    if(i > 100) {
      this.push(null)
    } else {
      const buffer = Buffer.from(String(i) + '\n')
      this.push(buffer)
    }
   }, 1000)
  }
}

class MultiplyByTenStream extends Writable {
  // obrigatoriamente temos a função de escrita
  // obrigatoriamente recebemos esses três argumentos
  _write(chunck, encoding, callback) {
    // chunck é o pedaço de informação
    // encoding é como essa informação está codificada
    // callback é a função que precisamos chamar quando terminamos de realizar as operações com o bloco de dado recebido
    console.log(Number(chunck.toString()) * 10)
    callback()
  }
}

const multiplyByTen = new MultiplyByTenStream()
new OneHundredStream().pipe(multiplyByTen)